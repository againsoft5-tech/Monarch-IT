<?php
/**
 * OpenCart 3.x - Orders List API
 * Endpoint: GET /index.php?route=api/orders
 *
 * Headers required:
 *   X-API-KEY: your_secret_api_key_here
 *
 * Optional Query Params:
 *   ?page=1                → pagination (default: 1)
 *   ?limit=20              → records per page (default: 20, max: 100)
 *   ?order_status_id=5     → filter by order status ID
 *   ?customer_id=123       → filter by specific customer
 *   ?date_from=2026-01-01  → filter from date (YYYY-MM-DD)
 *   ?date_to=2026-06-06    → filter to date (YYYY-MM-DD)
 *   ?search=keyword        → search by customer name or email
 */

class ControllerApiOrders extends Controller {

    private $api_key = 'agn_live_a7f3d92bc14e8f60d5c2e9b1f4a7d3c8e6b2f9a0c5d1e8b4f7a2d6c3e9b0f5';

    public function index() {
        // --- Set JSON response header ---
        $this->response->addHeader('Content-Type: application/json');
        $this->response->addHeader('Access-Control-Allow-Origin: *');
        $this->response->addHeader('Access-Control-Allow-Methods: GET');
        $this->response->addHeader('Access-Control-Allow-Headers: X-API-KEY, Content-Type');

        // --- API Key Authentication ---
        $provided_key = isset($this->request->server['HTTP_X_API_KEY'])
            ? $this->request->server['HTTP_X_API_KEY']
            : '';

        if ($provided_key !== $this->api_key) {
            $this->response->setOutput(json_encode([
                'success' => false,
                'error'   => 'Unauthorized: Invalid API Key',
                'code'    => 401
            ]));
            return;
        }

        // --- Pagination ---
        $page  = isset($this->request->get['page'])  ? (int)$this->request->get['page']  : 1;
        $limit = isset($this->request->get['limit']) ? (int)$this->request->get['limit'] : 20;
        if ($limit > 100) $limit = 100;
        if ($page  < 1)   $page  = 1;
        $start = ($page - 1) * $limit;

        // --- Build Query ---
        $sql = "SELECT SQL_CALC_FOUND_ROWS
                    o.order_id,
                    cg.name AS customer_group,
                    CONCAT(o.firstname, ' ', o.lastname) AS customer_name,
                    o.email,
                    o.telephone,
                    o.payment_address_1,
                    o.payment_city AS payment_city,
                    o.shipping_address_1,
                    o.shipping_city AS shipping_city,
                    o.payment_method,
                    o.shipping_method,
                    o.total,
                    o.currency_code,
                    o.date_added,
                    os.name AS order_status,
                    o.customer_id
                FROM `" . DB_PREFIX . "order` o
                LEFT JOIN `" . DB_PREFIX . "order_status` os
                    ON (o.order_status_id = os.order_status_id
                        AND os.language_id = '" . (int)$this->config->get('config_language_id') . "')
                LEFT JOIN `" . DB_PREFIX . "customer_group_description` cg
                    ON (o.customer_group_id = cg.customer_group_id
                        AND cg.language_id = '" . (int)$this->config->get('config_language_id') . "')
                WHERE 1";

        // Optional: filter by order status
        if (!empty($this->request->get['order_status_id'])) {
            $sql .= " AND o.order_status_id = '" . (int)$this->request->get['order_status_id'] . "'";
        }

        // Optional: filter by customer
        if (!empty($this->request->get['customer_id'])) {
            $sql .= " AND o.customer_id = '" . (int)$this->request->get['customer_id'] . "'";
        }

        // Optional: date range filter
        if (!empty($this->request->get['date_from'])) {
            $sql .= " AND DATE(o.date_added) >= '" . $this->db->escape($this->request->get['date_from']) . "'";
        }
        if (!empty($this->request->get['date_to'])) {
            $sql .= " AND DATE(o.date_added) <= '" . $this->db->escape($this->request->get['date_to']) . "'";
        }

        // Optional: search by name or email
        if (!empty($this->request->get['search'])) {
            $search = $this->db->escape($this->request->get['search']);
            $sql   .= " AND (o.firstname LIKE '%" . $search . "%'
                         OR o.lastname  LIKE '%" . $search . "%'
                         OR o.email     LIKE '%" . $search . "%')";
        }

        $sql .= " ORDER BY o.order_id DESC";
        $sql .= " LIMIT " . (int)$start . ", " . (int)$limit;

        $query       = $this->db->query($sql);
        $total_rows  = $this->db->query("SELECT FOUND_ROWS() AS total")->row['total'];
        $total_pages = ceil($total_rows / $limit);

        // --- Format Orders ---
        $orders = [];
        foreach ($query->rows as $row) {
            $orders[] = [
                'order_id'        => (int)$row['order_id'],
                'customer_id'     => (int)$row['customer_id'],
                'customer_group'  => $row['customer_group'],
                'customer_name'   => $row['customer_name'],
                'email'           => $row['email'],
                'telephone'       => $row['telephone'],
                'payment_address' => $row['payment_address_1'] . ($row['payment_city'] ? ', ' . $row['payment_city'] : ''),
                'shipping_address'=> $row['shipping_address_1'] . ($row['shipping_city'] ? ', ' . $row['shipping_city'] : ''),
                'payment_method'  => $row['payment_method'],
                'shipping_method' => $row['shipping_method'],
                'total'           => (float)$row['total'],
                'currency_code'   => $row['currency_code'],
                'date_added'      => $row['date_added'],
                'order_status'    => $row['order_status'],
            ];
        }

        // --- Response ---
        $output = [
            'success'     => true,
            'total'       => (int)$total_rows,
            'page'        => $page,
            'limit'       => $limit,
            'total_pages' => (int)$total_pages,
            'data'        => $orders
        ];

        $this->response->setOutput(json_encode($output, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    }
}
