<?php

/*
 * @version		$Id: view.html.php 1.2.7 06-08-2018 $
 * @package		Yendif Video Share
 * @copyright   Copyright (C) 2014-2018 Yendif Technologies (P) Ltd
 * @license     GNU/GPL http://www.gnu.org/licenses/gpl-2.0.html
*/

// no direct access
defined('_JEXEC') or die('Restricted access');

class YendifVideoShareViewSearch extends YendifVideoShareView {

	public function display( $tpl = null ) {	
	
		jimport( 'joomla.application.pathway' );
		
		$app = JFactory::getApplication();	
		$document = JFactory::getDocument();		
				
		$document->editor = $app->getCfg('fromname');
		$document->editorEmail = $app->getCfg('mailfrom');	
		
		$model = $this->getModel();
		
		$config = YendifVideoShareUtils::getConfig();					
        $items = $model->getItems( $config->feed_limit, $config->schedule_video_publishing);	
				
		foreach( $items as $item ) {
			$title = $this->escape( $item->title );
			$title = html_entity_decode( $title, ENT_COMPAT, 'UTF-8' );
			
			$target_url = YendifVideoShareUtils::buildRoute( $item, 'video' );
			
			$description  = $item->description;				
			$description .= '<img src="'.$item->image.'" />';
					
			$date = $item->created_date ? date( 'r', strtotime( $item->created_date ) ) : '';
								
			// load individual item creator class
			$feeditem = new JFeedItem();
			
			$feeditem->title		= $title;
			$feeditem->link			= $target_url;				
			$feeditem->description	= $description;
			$feeditem->date			= $date;
			$feeditem->category		= $item->category;								
			
			// loads item info into rss array
			$document->addItem( $feeditem );				
		}
					
	}	
			
}