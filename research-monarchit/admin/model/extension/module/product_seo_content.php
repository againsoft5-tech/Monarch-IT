<?php
 class ModelExtensionModuleProductSeoContent extends Model {

    public function install() {
        $sql = "CREATE TABLE IF NOT EXISTS `" . DB_PREFIX . "product_seo_content` (
                    `seo_content_id` int(11) NOT NULL auto_increment,
                    `product_id` int(11) NOT NULL,
                    `language_id` int(4) default NULL,
                    `description` text collate utf8_bin  default NULL,
                    PRIMARY KEY  (`seo_content_id`)
                    ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin;";
        $this->db->query($sql);
    }

    public function uninstall() {
        $sql = "DROP TABLE IF EXISTS `" . DB_PREFIX . "product_seo_content`";
        $this->db->query($sql);
    }

    public function get_desrc_product($product_id) {
        $query = $this->db->query("SELECT *  FROM " . DB_PREFIX . "product_seo_content WHERE product_id ='" . (int) $product_id . "'");
        $product_seo_content_data = array();
        if ($query->rows) {
            foreach ($query->rows as $result) {
                $product_seo_content_data[$result['language_id']] = array(
                    'seo_content_id' => $result['seo_content_id'],
                    'product_id' => $result['product_id'],
                    'description' => $result['description']
                );
            }
        }
        return $product_seo_content_data;
    }

    public function get_desrc_product_copy($product_id) {
        $query = $this->db->query("SELECT *  FROM " . DB_PREFIX . "product_seo_content WHERE product_id ='" . (int) $product_id . "'");
        $product_seo_content_data = array();
        if ($query->rows) {
            foreach ($query->rows as $result) {
                $product_seo_content_data[$result['language_id']] = array(
                    'product_id' => $result['product_id'],
                    'description' => $result['description']
                );
            }
        }
        return $product_seo_content_data;
    }

    public function insert($product_id, $data) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "product_seo_content WHERE product_id = '" . (int) $product_id . "'");

        foreach ($data['product_seo_content'] as $language_id => $product_desrc) {
            
            $product_desrc['seo_content_id'] = isset($product_desrc['seo_content_id']) ? (int) $product_desrc['seo_content_id'] : '';
            if (isset($language_id) && $product_desrc['description']) {
                $this->db->query("INSERT INTO " . DB_PREFIX . "product_seo_content SET seo_content_id = '" . $product_desrc['seo_content_id'] . "', product_id = '" . (int) $product_id . "', language_id = '" . (int) $language_id . "', description = '" . $product_desrc['description'] . "'");
            }
        }
    }

}

?>