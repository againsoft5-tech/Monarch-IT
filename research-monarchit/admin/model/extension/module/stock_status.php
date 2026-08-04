<?php
class ModelExtensionModuleStockStatus extends Model {
    public function __construct($register) {
        parent::__construct($register);
    }

    public function install() {
        $sql = "CREATE TABLE IF NOT EXISTS `" . DB_PREFIX . "stock_status_custom` (
                    `id` int(11) NOT NULL auto_increment,
                    `stock_status_id` int(11) NOT NULL,
                    `hide_price` int(4) default 0,
                    `hide_button` int(4) default 0,
                    `replace_text` text collate utf8_bin default NULL,
                    `change_quantity` int(4) default 0,
                    `quantity` int(11) default 0,
                    `call_button` int(4) default 0,
                    `hide_from_search_category` int(4) default 0,
                    PRIMARY KEY  (`id`)
                    ) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin;";
        $this->db->query($sql);
    }

    public function uninstall() {
        $sql = "DROP TABLE IF EXISTS `" . DB_PREFIX . "stock_status_custom`";
        $this->db->query($sql);
    }

    public function insert($data) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "stock_status_custom");
        
        $stock_status_id = $data['stock_status_id'];
    
        foreach ($stock_status_id as $key => $stock_status) {
            $hide_price = $data['hide_price'][$key];
            $hide_button = $data['hide_button'][$key];
            $replace_text = $data['replace_text'][$key];
            $change_quantity = $data['change_quantity'][$key];
            $quantity = $data['quantity'][$key];
            $call_button = $data['call_button'][$key];
            $hide_from_search_category = $data['hide_from_search_category'][$key];
            
            $this->db->query("INSERT INTO " . DB_PREFIX . "stock_status_custom SET stock_status_id = '" . $stock_status . "', hide_price = '" . $hide_price . "', hide_button = '" . $hide_button . "', replace_text = '" . $replace_text . "', change_quantity = '" . $change_quantity . "', quantity = '" . $quantity . "', call_button = '" . $call_button . "', hide_from_search_category = '" . $hide_from_search_category . "'");
            
        }
    }

}
