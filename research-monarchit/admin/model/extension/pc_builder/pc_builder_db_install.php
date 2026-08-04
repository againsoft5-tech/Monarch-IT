<?php

class ModelExtensionPcBuilderPcBuilderDbInstall extends Model {

    public function install() {
        $this->db->query("CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "pc_builder_build (
				`pc_builder_build_id` int(11) NOT NULL AUTO_INCREMENT,
				`customer_id` int(11) NOT NULL,
				`build` text NOT NULL,
				`code` varchar(16) NOT NULL,
				`date_added` datetime NOT NULL,
				PRIMARY KEY (`pc_builder_build_id`)
              ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci"); 

        $this->db->query("CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "pc_builder_category (
				`pc_builder_category_id` int(11) NOT NULL AUTO_INCREMENT,
				`status` tinyint(1) NOT NULL,
				`sort_order` tinyint(3) NOT NULL,
				PRIMARY KEY (`pc_builder_category_id`)
              ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci"); 

        $this->db->query("CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "pc_builder_category_description (
				`pc_builder_category_id` int(11) NOT NULL,
				`language_id` int(11) NOT NULL,
				`name` varchar(255) NOT NULL,           
                PRIMARY KEY (`pc_builder_category_id`,`language_id`)
              ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci");
		
		$this->db->query("CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "pc_builder_component (
				`pc_builder_component_id` int(11) NOT NULL AUTO_INCREMENT,
				`pc_builder_category_id` int(11) NOT NULL,
				`image` varchar(255) DEFAULT NULL,
				`required` tinyint(1) NOT NULL,
				`status` tinyint(1) NOT NULL,
				`sort_order` tinyint(3) NOT NULL,                
				PRIMARY KEY (`pc_builder_component_id`)
			) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci");

		$this->db->query("CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "pc_builder_component_category (
			`pc_builder_component_id` int(11) NOT NULL,
  			`category_id` int(11) NOT NULL,                
			PRIMARY KEY (`pc_builder_component_id`,`category_id`),
			KEY `category_id` USING BTREE (`category_id`)
		) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci");

		$this->db->query("CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "pc_builder_component_description (
			`pc_builder_component_id` int(11) NOT NULL,
			`language_id` int(11) NOT NULL,
			`name` varchar(255) NOT NULL,                
			PRIMARY KEY (`pc_builder_component_id`,`language_id`)
		) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci");

		$this->db->query("CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "pc_builder_incompatible_category (
			`category_id` int(11) NOT NULL,
  			`incompatible_id` int(11) NOT NULL,           
			PRIMARY KEY (`category_id`,`incompatible_id`),
			KEY `incompatible_id` USING BTREE (`incompatible_id`)
		) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci");

		$this->db->query("CREATE TABLE IF NOT EXISTS " . DB_PREFIX . "pc_builder_order (
			`pc_builder_order_id` int(11) NOT NULL AUTO_INCREMENT,
			`order_id` int(11) NOT NULL,
			`build` text NOT NULL,
			`pc_builder_categories` text NOT NULL,
			`amount` decimal(15,4) NOT NULL,
			`weight` decimal(15,8) NOT NULL,           
			PRIMARY KEY (`pc_builder_order_id`),
			KEY `order_id` USING BTREE (`order_id`)
		) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci");
    }
}