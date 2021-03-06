<?php

/*
 * @version		$Id: upload.php 1.2.7 06-08-2018 $
 * @package		Yendif Video Share
 * @copyright   Copyright (C) 2014-2018 Yendif Technologies (P) Ltd
 * @license     GNU/GPL http://www.gnu.org/licenses/gpl-2.0.html
*/

// no direct access
defined('_JEXEC') or die('Restricted access');

class YendifVideoShareControllerUpload extends YendifVideoShareController {
	
	public function upload() {
	
		$app = JFactory::getApplication();
		
		$id    = $app->input->getInt('id');
		$field = $app->input->get('f');
				
		$folder = 'videos'.DIRECTORY_SEPARATOR.$id;
		
		jimport('joomla.filesystem.folder');		
		if( ! JFolder::exists(YENDIF_VIDEO_SHARE_UPLOAD_BASE . $folder ) ) JFolder::create( YENDIF_VIDEO_SHARE_UPLOAD_BASE . $folder );
		
		$uploader = YendifVideoShareUpload::getInstance();
		$file = $uploader->doUpload( 'upload_'.$field, $folder );
		
		echo $file;
		exit();
		
	}
		
}