<?php
/**
 *
 * @author Clicker
 * Commercial Installation-Based License
 * This extension has Installation-based license is per OpenCart installation.
 * Support: info@clicker.com.ua
 * https://opencart.click
 *
 */
class ControllerExtensionLightAttributeHelper extends Controller {
	public $selectbox_limit = 100;

	public function __construct($registry) {
		parent::__construct($registry);

		$this->load->model('extension/light_attribute_helper');
	}

	public function index() {

	}

	public function get_selectbox_limit() {
		return $this->selectbox_limit;
	}

	public function autocomplete() {
		$json = array();

		$ac_type = !empty($this->request->get['ac_type']) ? $this->request->get['ac_type'] : '';

		switch ($ac_type) {
			case 'attribute_value':
				if (isset($this->request->get['filter_name'])) {
					//$this->load->model('catalog/attribute');
					$this->load->model('localisation/language');

					$languages = $this->model_localisation_language->getLanguages();

					$filter_data = array(
						'filter_name' => $this->request->get['filter_name'],
						'filter_attribute_id' => !empty($this->request->get['filter_id']) ? (int)$this->request->get['filter_id'] : 0,
						'filter_language_id' => !empty($this->request->get['filter_language_id']) ? (int)$this->request->get['filter_language_id'] : (int)$this->config->get('config_language_id'),
						'start' => 0,
						'limit' => $this->selectbox_limit
					);

					$sql = "SELECT pa.`attribute_id`, ad.`name`, pa.`text`";

					foreach ($languages as $language) { // collect translations of this attribute value in all languages
						if (!empty($filter_data['filter_language_id']) && (int)$language['language_id'] == (int)$filter_data['filter_language_id']) continue;
						$sql .= " , (SELECT `text` FROM `" . DB_PREFIX . "product_attribute` WHERE attribute_id = pa.attribute_id AND product_id = pa.product_id AND language_id = '" . (int)$language['language_id'] . "' LIMIT 1) AS `text_language_" . (int)$language['language_id'] . "`";
					}

					$sql .= " FROM `" . DB_PREFIX . "product_attribute` pa";

					$sql .= " LEFT JOIN `" . DB_PREFIX . "attribute_description` ad ON (pa.attribute_id = ad.attribute_id AND ad.language_id = '" . (int)$this->config->get('config_language_id') . "')
							WHERE pa.`text` != ''";

					if (!empty($filter_data['filter_name'])) {
						$words = explode(' ', trim($filter_data['filter_name']));
						foreach ($words as $word) {
							if (!trim($word)) continue;
							$sql .= " AND pa.`text` LIKE '%" . $this->db->escape($word) . "%'";
						}
					}

					if (!empty($filter_data['filter_attribute_id'])) {
						$sql .= " AND pa.`attribute_id` = '" . (int)$filter_data['filter_attribute_id'] . "'";
					}

					if (!empty($filter_data['filter_language_id'])) {
						$sql .= " AND pa.`language_id` = '" . (int)$filter_data['filter_language_id'] . "'";
					}

					$sql .= " GROUP BY ad.name, pa.`text`";
					//$sql .= " ORDER BY pa.`text`";
					$sql .= " LIMIT " . (int)$filter_data['start'] . ', ' . (int)$filter_data['limit'];
					//echo '<pre>'.__METHOD__.' ['.__LINE__.']: '; print_r($sql); echo '</pre>';
					$results = $this->db->query($sql);
					$results = $results->rows;

					foreach ($results as $result) {
						$translations = array(); // collect translations of this attribute value in all languages

						foreach ($languages as $language) {
							if (isset($result['text_language_' . (int)$language['language_id']])) {
								$translations[(int)$language['language_id']] = $result['text_language_' . (int)$language['language_id']];
							}
						}

						$json[] = array(
							'id' => $result['attribute_id'],
							'category' => strip_tags(html_entity_decode($result['name'], ENT_QUOTES, 'UTF-8')),
							'title' => str_replace(array(PHP_EOL, "\n\r", "\r\n", "\n", "\r"), ' ', strip_tags(html_entity_decode($result['text'], ENT_QUOTES, 'UTF-8'))),
							'value' => html_entity_decode($result['text'], ENT_QUOTES, 'UTF-8'),
							'ac_type' => !empty($this->request->get['ac_type']) ? $this->request->get['ac_type'] : '',
							'data_language_id' => !empty($filter_data['filter_language_id']) ? (int)$filter_data['filter_language_id'] : 0,
							'translations' => $translations,
						);
					}
				}

				$sort_order = array();

				foreach ($json as $key => $value) {
					$sort_order[$key] = $value['category'] . ' - ' . $value['title'];
				}

				array_multisort($sort_order, SORT_ASC, $json);
				break;

			case 'ah_category':
				if (isset($this->request->get['filter_name'])) {
					$this->load->model('catalog/attribute');

					$filter_data = array(
						'filter_name' => $this->request->get['filter_name'],
						'filter_category_id' => !empty($this->request->get['filter_id']) ? (int)$this->request->get['filter_id'] : 0,
						'filter_language_id' => !empty($this->request->get['filter_language_id']) ? (int)$this->request->get['filter_language_id'] : (int)$this->config->get('config_language_id'),
						'start' => 0,
						'limit' => $this->selectbox_limit
					);

					$results = $this->model_extension_light_attribute_helper->get_category_attributes($filter_data);

					foreach ($results as $result) {
						$result['data'] = json_decode($result['data'], true);

						foreach ($result['data'] as $idx => $product_attribute) {
							$attribute_info = $this->model_catalog_attribute->getAttribute($product_attribute['attribute_id']);
							if ($attribute_info) {
								$result['data'][$idx]['name'] = $attribute_info['name'];
							} else {
								unset($result['data'][$idx]);
							}
						}

						$json[] = array(
								'id' => $result['category_id'],
								'category' => '',
								'title' => str_replace(array(PHP_EOL, "\n\r", "\r\n", "\n", "\r"), ' ', strip_tags(html_entity_decode($result['path'], ENT_QUOTES, 'UTF-8'))),
								'value' => $result['category_id'],
								'value_obj' => (array('category_id' => (int)$result['category_id'], 'data' => $result['data'])),
								'ac_type' => !empty($this->request->get['ac_type']) ? $this->request->get['ac_type'] : '',
						);
					}
				}

				$sort_order = array();

				foreach ($json as $key => $value) {
					$sort_order[$key] = $value['category'] . ' - ' . $value['title'];
				}

				array_multisort($sort_order, SORT_ASC, $json);
				break;
		}

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($json));
	}

	public function template_product() {
		$data = array_merge((!empty($data)? $data : array()), $this->load->language('extension/light_attribute_helper'));
		$this->load->model('extension/light_attribute_helper');

		$query = $this->db->query("SELECT * FROM `" . DB_PREFIX . "modification` WHERE `code` = 'light_attribute_helper'");
		$data['ah_version'] = !empty($query->row['version']) ? trim($query->row['version']) : '';
		$data['oc_version'] = VERSION;

		if (version_compare(VERSION, '3.0.0') >= 0) {
			$data['token_name'] = 'user_token';
			$data['user_token'] = $this->session->data[$data['token_name']];
		} else {
			$data['token_name'] = 'token';
			$data['user_token'] = $this->session->data[$data['token_name']];
		}

		$this->load->model('localisation/language');

		$data['languages'] = $this->model_localisation_language->getLanguages();

		$data['ah_css'] = $this->load->view('extension/light_attribute_helper_css', $data);

		return $this->load->view('extension/light_attribute_helper_product', $data);
	}

	public function template_category() {
		$data = array_merge((!empty($data)? $data : array()), $this->load->language('extension/light_attribute_helper'));
		$this->load->model('extension/light_attribute_helper');

		if (version_compare(VERSION, '3.0.0') >= 0) {
			$data['token_name'] = 'user_token';
			$data['user_token'] = $this->session->data[$data['token_name']];
		} else {
			$data['token_name'] = 'token';
			$data['user_token'] = $this->session->data[$data['token_name']];
		}

		if (isset($this->request->post['ah_attributes'])) {
			$data['ah_attributes'] = $this->request->post['ah_attributes'];
		} else {
			$data['ah_attributes'] = isset($this->request->get['category_id']) ? $this->model_extension_light_attribute_helper->get_category_attributes(array('filter_category_id' => $this->request->get['category_id'])) : array();
			if (!empty($data['ah_attributes']['data'])) {
				$data['ah_attributes'] = json_decode($data['ah_attributes']['data'], true);
			} else {
				$data['ah_attributes'] = array();
			}
		}
		$this->load->model('catalog/attribute');
		foreach ($data['ah_attributes'] as $idx => $product_attribute) {
			$attribute_info = $this->model_catalog_attribute->getAttribute($product_attribute['attribute_id']);
			if ($attribute_info) {
				$data['ah_attributes'][$idx]['name'] = $attribute_info['name'];
			} else {
				unset($data['ah_attributes'][$idx]);
			}
		}

		$this->load->model('localisation/language');

		$data['languages'] = $this->model_localisation_language->getLanguages();

		$data['ah_css'] = $this->load->view('extension/light_attribute_helper_css', $data);

		return $this->load->view('extension/light_attribute_helper_category', $data);
	}
}