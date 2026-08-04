<?php
 class ControllerExtensionModuleStockStatus extends Controller {

    private $error = array();

    public function index() {
        $this->install();
        
        $this->load->language('extension/module/stock_status');
        $this->document->setTitle($this->language->get('heading_title1'));
        $this->load->model('setting/setting');
        $this->load->model('extension/module/stock_status');
        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
          
            $module_stock_status = $this->request->post['module_stock_status'];
            
            $store_id = isset($this->request->get['store_id']) ? $this->request->get['store_id'] : 0 ;
            
            $this->model_setting_setting->editSetting('module_stock_status', array('module_stock_status' => $module_stock_status), $store_id);
            
            $data = $this->request->post;
            
            $this->model_extension_module_stock_status->insert($data);
            
            $this->session->data['success'] = $this->language->get('text_success');
            
            $this->response->redirect($this->url->link('extension/module/stock_status', 'user_token=' . $this->session->data['user_token'], 'SSL'));
        }

        $data['heading_title'] = $this->language->get('heading_title1');
        
        if (($this->request->server['REQUEST_METHOD'] == 'POST')) {
            $data['module_stock_status'] = $this->request->post['module_stock_status'];
        } else {
            $data['module_stock_status'] = $this->config->get('module_stock_status');
        }
        
        
        
        $data['stock_status_data'] = array();
        $stock_statuses = $this->db->query("SELECT * FROM " . DB_PREFIX . "stock_status_custom")->rows;
        if($stock_statuses){
            foreach ($stock_statuses as $row) {
                $data['stock_status_data'][] = array(
                    'id'   => $row['id'],
                    'stock_status_id'   => $row['stock_status_id'],
                    'hide_price'   => $row['hide_price'],
                    'hide_button'   => $row['hide_button'],
                    'replace_text'   => $row['replace_text'],
                    'change_quantity'   => $row['change_quantity'],
                    'quantity'   => $row['quantity'],
                    'call_button'   => $row['call_button'],
                    'hide_from_search_category'   => $row['hide_from_search_category']
                );
            }
        }
        
        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        $data['breadcrumbs'] = array();

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_home'),
            'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'], 'SSL')
        );

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('text_module'),
            'href' => $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module', 'SSL')
        );

        $data['breadcrumbs'][] = array(
            'text' => $this->language->get('heading_title1'),
            'href' => $this->url->link('extension/module/stock_status', 'user_token=' . $this->session->data['user_token'], 'SSL')
        );

        $data['action'] = $this->url->link('extension/module/stock_status', 'user_token=' . $this->session->data['user_token'], 'SSL');

        $data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type=module', 'SSL');

        $data['user_token'] = $this->session->data['user_token'];

        $data['stock_statuses'] = $this->db->query("SELECT * FROM " . DB_PREFIX . "stock_status")->rows;

        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        $this->response->setOutput($this->load->view('extension/module/stock_status', $data));
    }

    private function validate() {
        if (!$this->user->hasPermission('modify', 'extension/module/stock_status')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        if (!$this->error) {
            return true;
        } else {
            return false;
        }
    }
    
    public function uninstall() {
        $this->load->model('extension/module/stock_status');
        $this->model_extension_module_stock_status->uninstall();
        $this->load->model('setting/setting');
        $this->model_setting_setting->deleteSetting('module_stock_status');
    }

    public function install() {
        $this->load->model('extension/module/stock_status');
        $this->model_extension_module_stock_status->install();
    }

}

?>