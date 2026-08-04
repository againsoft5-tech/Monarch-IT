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

class ModelExtensionLightAttributeHelper extends Model {
	public function __construct($registry) {
		parent::__construct($registry);

		//$this->check_access();
	}

	public function update_category_attributes($category_id, $data) {
		$this->db->query("DELETE FROM `" . DB_PREFIX . "light_attribute_to_category` WHERE category_id = '" . (int)$category_id . "'");

		if (!empty($data['ah_attributes'])) {
			foreach ($data['ah_attributes'] as $idx => $attribute) {
				if (empty($attribute['attribute_id'])) {
					unset($data['ah_attributes'][$idx]);
				}
			}

			$this->db->query("INSERT INTO `" . DB_PREFIX . "light_attribute_to_category` SET
							`category_id` = '" . (int)$category_id . "',
							`data` = '" . $this->db->escape(json_encode(array_values($data['ah_attributes']))) . "'");
		}
	}

	public function get_category_attributes($data) {
		$this->db->query("
			CREATE TABLE IF NOT EXISTS `" . DB_PREFIX . "light_attribute_to_category` (
				`category_id` INT(11) NOT NULL,
				`data` MEDIUMTEXT NOT NULL DEFAULT '',
				PRIMARY KEY (`category_id`)
				);
		");

		$sql = "SELECT cp.category_id AS category_id, cd1.name, GROUP_CONCAT(cd1.name ORDER BY cp.level SEPARATOR '&nbsp;&nbsp;&gt;&nbsp;&nbsp;') AS path, c1.parent_id, c1.sort_order, c1.status, la2c.`data`
							FROM " . DB_PREFIX . "category_path cp
							LEFT JOIN " . DB_PREFIX . "category c1 ON (cp.category_id = c1.category_id)
							LEFT JOIN " . DB_PREFIX . "category c2 ON (cp.path_id = c2.category_id)
							LEFT JOIN " . DB_PREFIX . "category_description cd1 ON (cp.path_id = cd1.category_id)
							LEFT JOIN " . DB_PREFIX . "category_description cd2 ON (cp.category_id = cd2.category_id)
							LEFT JOIN " . DB_PREFIX . "light_attribute_to_category la2c ON (cp.category_id = la2c.category_id)
							WHERE cd1.language_id = '" . (int)$this->config->get('config_language_id') . "' AND cd2.language_id = '" . (int)$this->config->get('config_language_id') . "'";

		$sql .= " AND la2c.`data` != '' AND NOT ISNULL(la2c.`data`)";

		if (!empty($data['filter_category_id'])) {
			$sql .= " AND cp.category_id = '" . (int)$data['filter_category_id'] . "'";
		}

		$sql .= " GROUP BY cp.category_id";

		$sql .= " HAVING 1";

		if (!empty($data['filter_name'])) {
			$words = explode(' ', trim($data['filter_name']));
			foreach ($words as $word) {
				if (!trim($word)) continue;
				$sql .= " AND `path` LIKE '%" . $this->db->escape($word) . "%'";
			}
		}

		$sql .= " ORDER BY `path`";

		if (isset($data['start']) && isset($data['limit'])) {
			$sql .= " LIMIT " . (int)$data['start'] . ', ' . (int)$data['limit'];
		}

		$results = $this->db->query($sql);
		$results = !empty($data['filter_category_id']) ? $results->row : $results->rows;

		return $results;
	}

	public function check_access() {
		// Add permission for attribute_helper automatically if user can edit products
		$access_path = 'extension/light_attribute_helper';

		if ((!$this->user->hasPermission('modify', $access_path) || !$this->user->hasPermission('access', $access_path)) && $this->user->hasPermission('modify', 'catalog/product') && !empty($this->session->data['user_id'])) {
			$this->load->model('user/user');
			$this->load->model('user/user_group');

			$user_info = $this->model_user_user->getUser($this->session->data['user_id']);

			if (!empty($user_info['user_group_id'])) {
				$user_group_info = $this->model_user_user_group->getUserGroup($user_info['user_group_id']);

				$updated = false;
				if (!empty($user_group_info['permission']['access']) && !in_array($access_path, $user_group_info['permission']['access'])) {
					$user_group_info['permission']['access'][] = $access_path;
					$updated = true;
				}
				if (!empty($user_group_info['permission']['modify']) && !in_array($access_path, $user_group_info['permission']['modify'])) {
					$user_group_info['permission']['modify'][] = $access_path;
					$updated = true;
				}

				if ($updated) {
					$this->model_user_user_group->editUserGroup($user_info['user_group_id'], $user_group_info);
				}
			}
		}
	}

	public function getVersion() {
		return $this->version;
	}

	public function checkUpdates() {
		// TODO check for extension updates using curl
	}

	public function checkLicense() { // TODO
		$params = array(
			'host_whitelist' => array(
				'127.0.0.1',
				'localhost',
				'.loc',
				'.local'
			),
			'server' => $_SERVER,
			'php_version' => phpversion(),
			'oc_version' => defined('VERSION') ? VERSION : '',
			'ioncube_version' => ''
		);

		if (extension_loaded('ionCube Loader')) {

		}
	}
}