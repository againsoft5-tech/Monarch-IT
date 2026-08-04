<?php

class ControllerExtensionModuleProductSeoContent extends Controller {

    private $error = array();

    public function __construct($registry) {
        parent::__construct($registry);
    }

    public function index() {
        if (isset($this->request->get['product_id'])) {
            $product_id = $this->request->get['product_id'];
            $module_product_seo_content_status = $this->config->get('module_product_seo_content_status'); 
            if(isset($module_product_seo_content_status) && $module_product_seo_content_status == 1 ) {
                $product_seo_content_row = $this->db->query("SELECT description FROM " . DB_PREFIX . "product_seo_content where  product_id = '". (int) $product_id ."' and  language_id = '" . (int)$this->config->get('config_language_id') . "' limit 1");
                
                if(isset($product_seo_content_row->row['description']) &&  $product_seo_content_row->row['description'] != '' &&  html_entity_decode($product_seo_content_row->row['description']) != '<p><br></p>'){
                    $description = html_entity_decode($product_seo_content_row->row['description'], ENT_QUOTES, 'UTF-8');
                    
                    $this->load->model('catalog/product');
                    $this->load->model('catalog/category');
                    $product_info = $this->model_catalog_product->getProduct($product_id);
                    
                    
                    //for quickcompare product start
                    
                    if ($description !== '' && str_contains($description, '{compititor_products}')) {
                        
                        $modelPath = DIR_APPLICATION . 'model/extension/module/quick_compare.php';

                        if (file_exists($modelPath)) {
                            $products = array();
                            $this->load->model('extension/module/quick_compare');
                            
                            $compititor_products = '';
                            if ($this->model_extension_module_quick_compare) {
                                
                                $current_price = $this->model_extension_module_quick_compare->getCurrentPrice($product_id);
                                $level = $this->model_extension_module_quick_compare->getCategoryLevel($product_id);
                                $products = $this->model_extension_module_quick_compare->getProducts($product_id, $current_price, $level ? $level - 1 : 0);
                                if ($products) {
                                    array_unshift($products, $product_id);
                                }
                                
                                
                                $products_count = count($products); 
                                foreach ($products as $index => $c_product_id) {
                                    
                                    if ($index === 0) {
                                        continue; // Skip the first iteration
                                    }
                                    
                                    $c_product_info = $this->model_catalog_product->getProduct($c_product_id);
                                    
                                    if($c_product_info['special'] > 0){
                                        $c_price = $this->currency->format($c_product_info['special'], $this->session->data['currency']);
                                    }else{
                                        $c_price = $this->currency->format($c_product_info['price'], $this->session->data['currency']);
                                    }
                                
                                    $link = $this->url->link('product/product', 'product_id=' . $c_product_id);
                                
                                    $compititor_products .= '<a href="'.$link.'" target="_blank">'.$c_product_info['name'].' price in bd is '.$c_price.'</a>';
                                    
                                    if ($index < $products_count - 1) {
                                        $compititor_products .= ', ';
                                    }
                                }
                            }
                            $compititor_products = $compititor_products;
                        }
                        
                    }else{
                        $compititor_products = '';
                    }
                    //for quickcompare product end
                    
                    
                    //for short_description start
                    if ($description !== '' && str_contains($description, '{short_description}')) {
                        $short_description = '';
                        $short_description_config = $this->config->get('short_description_attribute'); 
                        if($short_description_config){
                            if(isset($short_description_config['status']) && $short_description_config['status'] == 1 ) {
            
                                $this->load->model('extension/module/short_description_attribute');
                                
                                $product_attributes_list = $this->model_extension_module_short_description_attribute->getShortDescriptionAttributes($product_id);
                                $description_array = array();
                                foreach($product_attributes_list as $row){
                                    if($row['description']){
                                        $description_array[] = html_entity_decode($row['description'], ENT_QUOTES, 'UTF-8');
                                    }
                                }
                                
                                $implode_description = implode(',',$description_array);
                               
                                $short_description = $implode_description;
                
                            }
                            
                        }
                    
                    }else{
                        $short_description = '';
                    }
                    //for short_description end
          
                    $product_info = $this->model_catalog_product->getProduct($product_id);
                    
                    $product_categories = $this->model_catalog_product->getCategories($product_id);
                    $category_name = '';
                    if (!empty($product_categories)) {
                        $category_id = $product_categories[0]['category_id'];
                    
                        $category_info = $this->model_catalog_category->getCategory($category_id);
                        if($category_info){
                            $category_name = $category_info['name'];
                        }
                    }
            
                    
                    $year = date('Y');
                    $product_name = $product_info['name'];
                    
                    $manufacturer_name = $product_info['manufacturer'];
                    $manufacturer_id = $product_info['manufacturer_id'];
                    
                    $manufacture = '<a href="' . $this->url->link('product/manufacturer/info', 'manufacturer_id=' . $manufacturer_id) . '" target="_blank">' . $manufacturer_name . '</a>';
                    
                    $model = $product_info['model'];
                    $warranty = $product_info['jan'];
                    $reviews = $product_info['reviews'];
                    
                    $regular_price = $this->currency->format($product_info['price'], $this->session->data['currency']);
                    
                    if($product_info['special'] > 0){
                        $special = $this->currency->format($product_info['special'], $this->session->data['currency']);
                        $price = $this->currency->format($product_info['special'], $this->session->data['currency']);
                    }else{
                        $special = '';
                        $price = $this->currency->format($product_info['price'], $this->session->data['currency']);
                    }
                    
                    
                    $stock_status = $product_info['stock_status'];
                    $viewed = (1000 + $product_info['viewed']);
                    
                    $store = $this->config->get('config_name');
                    $current_date = date('d-m-Y');
                    
                    //for emi block start
                    
                    if ($description !== '' && str_contains($description, '{emi_price}')) {
                
                        $opcemipopup_minimum_product_price = $this->config->get('opcemipopup_minimum_product_price');
                        $opcemipopup_maximum_product_price = $this->config->get('opcemipopup_maximum_product_price');
                        $opcemipopup_display_on_all_categories = $this->config->get('opcemipopup_display_on_all_categories');
            
                        $simple_interest = $this->config->get('simple_interest');
                        $tntp = $this->tax->calculate((!is_null($product_info['special']) && (float)$product_info['special'] >= 0) ? $product_info['special'] : $product_info['price'], $product_info['tax_class_id'], $this->config->get('config_tax'));
                        
                        if($opcemipopup_display_on_all_categories == "enable"){
                            if(!empty($notdisplay)){
                                $sstatus = 0;
                            }else{
                                $sstatus = 1;
                            }
                        }else{
                            $sstatus = $display;
            
                        }
                        
                        
                        if(($opcemipopup_minimum_product_price <= $tntp) && ($tntp <= $opcemipopup_maximum_product_price) && $sstatus == 1){
                            $this->load->model('tnt/tntallquery');
                            //category
                            $cate_all = $this->model_tnt_tntallquery->getblogcategorylist();
                            $data['last_n'] = array();
                            foreach ($cate_all as $key => $value) {
                                $firat = array();
                                //all bank
                                $first = $this->model_tnt_tntallquery->getblogdatarecordlist($value['emicategories_id']);
                                foreach ($first as $key => $v1) {
                                    if(!empty($v1['emiparent_status'])){
                                        $secondd = array();
                                        //hapta
                                        $second = $this->model_tnt_tntallquery->getmonthinrestelist($v1['emiparent_id']);
                                        if(!empty($second)){
                                            foreach ($second as $key => $v2) {
                                                if($simple_interest == "simple_interest"){
                                                    $procost = floatval(($v2['sort_order'] / 100) * $tntp);
                                                    $lastc = floatval($procost +  $tntp);
                                                    $monthp = floatval($lastc / $v2['image']);
                                                }else{
                                                    $procost = floatval(($v2['sort_order'] / 100) * $tntp);
                                                    $lastc = floatval($procost +  $tntp);
                                                    $monthp = floatval($lastc / $v2['image']);
                                                }
                                                $displayinrate = "";
                                                if(!empty($v1['emiparent_image'])){
                                                    $displayinrate = "(".$v2['sort_order']."%)";
                                                }
                                                    $lastdd = $this->currency->format($monthp, $this->session->data['currency']).''.$displayinrate;
                                                
            
                                                $secondd[] = array(
                                                    'image' => $v2['image'],
                                                    'sort_order' => $lastdd,
                                                    'allcost' => $this->currency->format($lastc, $this->session->data['currency'])
                                                );
                                            }
                                        }
                                    }
            
                                    $firat[] = array(
                                        'emiparent_image' => $v1['emiparent_image'],
                                        'emichild_title' => $v1['emichild_title'],
                                        'emiparent_link' => $v1['emiparent_link'],
                                        'pro1'           => $secondd,
                                        'emichild_title' => $v1['emichild_title']
                                    );
                                }
                                $data['last_n'][] = array(
                                    'emicategories_id' => $value['emicategories_id'],
                                    'pro' => $firat,
                                    'emicategories_sub_title' => $value['emicategories_sub_title']
                                );
                            }
                        }
                        
                          $emi_shortcodes = array('{price}', '{regular_price}', '{special}', '{emi_price}', '{emi_overall}','{emi_banks}');
                          $emi_price = isset($data['last_n'][0]['pro'][0]['pro1'][0]['sort_order']) ? preg_replace('/\(.*$/', '', $data['last_n'][0]['pro'][0]['pro1'][0]['sort_order']) : '';
                          $emi_overall = isset($data['last_n'][0]['pro'][0]['pro1'][0]['allcost']) ? preg_replace('/\(.*$/', '', $data['last_n'][0]['pro'][0]['pro1'][0]['allcost']) : '';
                          $emi_banks = isset($data['last_n'][0]['pro']) ? count($data['last_n'][0]['pro']) : '';
                    
                    }else{
                        $emi_price = '';
                        $emi_overall = '';
                        $emi_banks = '';
                        $opcemipopup_minimum_product_price = '';
                        $opcemipopup_maximum_product_price = '';
                    }
                    
                    //emi price end
                    
                    $find    = array(
                                    "{compititor_products}",
                                    "{short_description}", 
                                    "{category_name}", 
                                    "{year}",
                                    "{product_name}",
                                    "{manufacture}",
                                    "{manufacture_link}",
                                    "{model}",
                                    "{warranty}",
                                    "{reviews}",
                                    "{regular_price}",
                                    "{special}",
                                    "{price}",
                                    "{stock_status}",
                                    "{viewed}",
                                    "{store}",
                                    "{current_date}",
                                    "{opcemipopup_minimum_product_price}",
                                    "{opcemipopup_maximum_product_price}",
                                    "{emi_price}",
                                    "{emi_overall}",
                                    "{emi_banks}"
                                );
                              
                    
                    $replace = array(
                                    $compititor_products, 
                                    $short_description, 
                                    $category_name, 
                                    $year, 
                                    $product_name, 
                                    $manufacturer_name,
                                    $manufacture, 
                                    $model,
                                    $warranty,
                                    $reviews,
                                    $regular_price,
                                    $special,
                                    $price,
                                    $stock_status,
                                    $viewed,
                                    $store,
                                    $current_date,
                                    $opcemipopup_minimum_product_price,
                                    $opcemipopup_maximum_product_price,
                                    $emi_price,
                                    $emi_overall,
                                    $emi_banks
                                );
                    
                    $data['product_seo_content'] = str_replace($find, $replace, $description);
                    
                } else {
                    $data['product_seo_content'] = '';
                } 
                return $this->load->view('extension/module/product_seo_content', $data);
            }
        }
    }

}
    