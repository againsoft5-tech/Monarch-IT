<?php
/**
 * OpenCart 3.x - Customer List API
 * Endpoint: GET /index.php?route=api/customers
 *
 * Headers required:
 *   X-API-KEY: your_secret_api_key_here
 *
 * Optional Query Params:
 *   ?page=1          → pagination (default: 1)
 *   ?limit=20        → records per page (default: 20, max: 100)
 *   ?status=1        → filter by status (1=Enabled, 0=Disabled)
 *   ?search=keyword  → search by name or email
 */

class ControllerApiCustomers extends Controller {

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
        $sql    = "SELECT SQL_CALC_FOUND_ROWS
                        c.customer_id,
                        CONCAT(c.firstname, ' ', c.lastname) AS customer_name,
                        c.email,
                        c.telephone,
                        c.ip,
                        c.status,
                        c.date_added,
                        cg.name AS customer_group,
                        a.address_1,
                        a.address_2,
                        a.city,
                        a.postcode,
                        co.name AS country
                   FROM `" . DB_PREFIX . "customer` c
                   LEFT JOIN `" . DB_PREFIX . "customer_group_description` cg
                        ON (c.customer_group_id = cg.customer_group_id
                            AND cg.language_id = '" . (int)$this->config->get('config_language_id') . "')
                   LEFT JOIN `" . DB_PREFIX . "address` a
                        ON (c.address_id = a.address_id)
                   LEFT JOIN `" . DB_PREFIX . "country` co
                        ON (a.country_id = co.country_id)
                   WHERE 1";

        $params = [];

        // Optional: filter by status
        if (isset($this->request->get['status']) && $this->request->get['status'] !== '') {
            $sql .= " AND c.status = '" . (int)$this->request->get['status'] . "'";
        }

        // Optional: search by name or email
        if (!empty($this->request->get['search'])) {
            $search = $this->db->escape($this->request->get['search']);
            $sql   .= " AND (c.firstname LIKE '%" . $search . "%'
                         OR c.lastname  LIKE '%" . $search . "%'
                         OR c.email     LIKE '%" . $search . "%')";
        }

        $sql .= " ORDER BY c.date_added DESC";
        $sql .= " LIMIT " . (int)$start . ", " . (int)$limit;

        $query      = $this->db->query($sql);
        $total_rows = $this->db->query("SELECT FOUND_ROWS() AS total")->row['total'];
        $total_pages = ceil($total_rows / $limit);

        // --- Format Customers ---
        $customers = [];
        foreach ($query->rows as $row) {
            $customers[] = [
                'customer_id'    => (int)$row['customer_id'],
                'customer_name'  => $row['customer_name'],
                'email'          => $row['email'],
                'telephone'      => $row['telephone'],
                'address'        => trim($row['address_1'] . ' ' . $row['address_2']),
                'city'           => $row['city'],
                'postcode'       => $row['postcode'],
                'country'        => $row['country'],
                'ip'             => $row['ip'],
                'status'         => $row['status'] ? 'Enabled' : 'Disabled',
                'date_added'     => $row['date_added'],
                'customer_group' => $row['customer_group'],
            ];
        }

        // --- Response ---
        $output = [
            'success'     => true,
            'total'       => (int)$total_rows,
            'page'        => $page,
            'limit'       => $limit,
            'total_pages' => (int)$total_pages,
            'data'        => $customers
        ];

        $this->response->setOutput(json_encode($output, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    }
}
