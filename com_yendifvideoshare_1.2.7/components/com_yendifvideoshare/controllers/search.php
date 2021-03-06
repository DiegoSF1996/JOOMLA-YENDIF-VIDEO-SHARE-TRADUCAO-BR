<?php

/*
 * @version		$Id: search.php 1.2.7 06-08-2018 $
 * @package		Yendif Video Share
 * @copyright   Copyright (C) 2014-2018 Yendif Technologies (P) Ltd
 * @license     GNU/GPL http://www.gnu.org/licenses/gpl-2.0.html
*/

// no direct access
defined('_JEXEC') or die('Restricted access');

class YendifVideoShareControllerSearch extends YendifVideoShareController {

	public function search() {
	
	    $document = JFactory::getDocument();
		$vType = $document->getType();
		
	    $model = $this->getModel('search');			
	    $view = $this->getView('search', $vType);        	
        $view->setModel($model, true);		
		$view->setLayout('default');
		$view->display();
		
	}
			
}