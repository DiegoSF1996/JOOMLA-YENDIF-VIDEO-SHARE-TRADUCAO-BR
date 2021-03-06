<?php

/*
 * @version		$Id: approval.php 1.2.7 06-08-2018 $
 * @package		Yendif Video Share
 * @copyright   Copyright (C) 2014-2018 Yendif Technologies (P) Ltd
 * @license     GNU/GPL http://www.gnu.org/licenses/gpl-2.0.html
*/

// no direct access
defined('_JEXEC') or die('Restricted access');

class YendifVideoShareControllerApproval extends YendifVideoShareController {

	public function approval() {
	
		$model = $this->getModel('approval');	
		
	    $view = $this->getView('approval', 'html');        	
        $view->setModel($model, true);		
		$view->setLayout('default');
		$view->display();
		
	}
	
	public function edit() {
	
		YendifVideoShareUtils::checkToken();
		
		$model = $this->getModel('approval');
		
	    $view = $this->getView('approval', 'html');        	
        $view->setModel($model, true);		
		$view->setLayout('edit');
		$view->edit();
		
	}
	
	public function delete() {
	
		YendifVideoShareUtils::checkToken();
		
		$model = $this->getModel('approval');
	 	$model->delete();
		
	}
	
	public function save()	{
	
		YendifVideoShareUtils::checkToken();
		
		$model = $this->getModel('approval');
	  	$model->save();
		
	}
	
	public function apply() {
	
		$this->save();
		
	}
	
	public function cancel() {
	
		YendifVideoShareUtils::checkToken();
		
		$model = $this->getModel('approval');
	    $model->cancel();
		
	}
	
	public function publish() {
	
		YendifVideoShareUtils::checkToken();
		
		$model = $this->getModel('approval');
        $model->publish();
		
    }
	
    public function unpublish() {
	
        $this->publish();
		
    }
	
	public function recreate() {
	
		$model = $this->getModel('approval');
		$model->recreate();
		
	}
		
}