<?php
class ControllerExtensionModuleCustomContentProductTwig extends Controller {
	public function index($setting) {
		if (isset($setting['module_description'][$this->config->get('config_language_id')])) {
		    
		    if (isset($this->request->get['product_id'])) {
    			$product_id = (int)$this->request->get['product_id'];
    		} else {
    			$product_id = 0;
    		}
    		
    		$this->load->model('catalog/product');
    		$this->load->model('catalog/category');
    		
    		
            
            
            
    
    		$product_info = $this->model_catalog_product->getProduct($product_id);
    		
    		$product_categories = $this->model_catalog_product->getCategories($product_id);
    		$data['category_name'] = '';
    		if (!empty($product_categories)) {
                $category_id = $product_categories[0]['category_id'];
            
                $category_info = $this->model_catalog_category->getCategory($category_id);
                if($category_info){
                    $data['category_name'] = $category_info['name'];
                }
            }
            
            
    		
    		$data['year'] = date('Y');
    		$data['product_name'] = $product_info['name'];
    		
    		$manufacturer_name = $product_info['manufacturer'];
    		$manufacturer_id = $product_info['manufacturer_id'];
    		
    		$data['manufacture'] = '<a href="' . $this->url->link('product/manufacturer/info', 'manufacturer_id=' . $manufacturer_id) . '" target="_blank">' . $manufacturer_name . '</a>';
    		
    		$data['model'] = $product_info['model'];
    		$data['warranty'] = $product_info['jan'];
    		$data['reviews'] = $product_info['reviews'];
    		
    		$data['regular_price'] = $this->currency->format($product_info['price'], $this->session->data['currency']);
    		
    		if($product_info['special'] > 0){
    		    $data['special'] = $this->currency->format($product_info['special'], $this->session->data['currency']);
    		    $data['price'] = $this->currency->format($product_info['special'], $this->session->data['currency']);
    		}else{
    		    $data['special'] = '';
    		    $data['price'] = $this->currency->format($product_info['price'], $this->session->data['currency']);
    		}
    		
    		
    		$data['stock_status'] = $product_info['stock_status'];
    		$data['viewed'] = (1000 + $product_info['viewed']);
    		
    		$data['store'] = $this->config->get('config_name');
    		$data['current_date'] = date('d-m-Y');
    		
    		
		    
			//for heading title dynamic start
			$title = html_entity_decode($setting['module_description'][$this->config->get('config_language_id')]['title'], ENT_QUOTES, 'UTF-8');
            $find    = array("{product_name}","{year}");
            $replace = array('', '', '');
            $replace = array($data['product_name'], $data['year']);
            
            $data['heading_title'] = htmlentities(str_replace($find, $replace, $title), ENT_QUOTES, 'UTF-8');
            //for heading title dynamic start
            

			return $this->load->view('extension/module/custom_content_product_twig', $data);
		}
	}
}