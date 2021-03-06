<?php

/*
 * @version		$Id: view.html.php 1.2.7 06-08-2018 $
 * @package		Yendif Video Share
 * @copyright   Copyright (C) 2014-2018 Yendif Technologies (P) Ltd
 * @license     GNU/GPL http://www.gnu.org/licenses/gpl-2.0.html
*/

// no direct access
defined('_JEXEC') or die('Restricted access');

class YendifVideoShareViewCategory extends YendifVideoShareView {

    public function display( $tpl = null ) {
	
	    $app = JFactory::getApplication();
		
		$model = $this->getModel();
		
		$this->item = $model->getItem();
				
		if( empty( $this->item ) ) {
			$app->enqueueMessage( JText::_('YENDIF_VIDEO_SHARE_ITEM_NOT_FOUND'), 'notice' );
			return true;
		}
		
		if( ! YendifVideoShareUtils::hasPermission( $this->item->access ) ) {
			$app->enqueueMessage( JText::_('YENDIF_VIDEO_SHARE_NO_PERMISSION'), 'notice' );
			return true;
		}
		
		$this->config = YendifVideoShareUtils::getConfig();
		$this->params = $app->getParams();
		$this->rows   = $this->params->get('no_of_rows', $this->config->no_of_rows);
		$this->cols   = $this->params->get('no_of_cols', $this->config->no_of_cols);
		
		$this->show_excerpt = $this->params->get('show_excerpt', $this->config->show_excerpt);
		$this->excerpt_length = $this->config->playlist_desc_limit;
		
		$this->show_videos_count = $this->params->get('show_videos_count', $this->config->show_media_count);
		if( $this->show_videos_count == 'global' ) {
			$this->show_videos_count = $this->config->show_media_count;						
		}
		
		$this->show_views = $this->params->get('show_views', $this->config->show_views);
		if( $this->show_views == 'global' ) {
			$this->show_views = $this->config->show_views;
		}
		
		$this->show_rating = $this->params->get('show_rating', $this->config->show_rating);
		if( $this->show_rating == 'global' ) {
			$this->show_rating = $this->config->show_rating;
		}

		$this->show_likes_dislikes = $this->params->get('show_likes_dislikes', $this->config->show_likes);
		if( $this->show_likes_dislikes == 'global' ) {
			$this->show_likes_dislikes = $this->config->show_likes;						
		}

		$this->enable_popup = $this->params->get('enable_popup', $this->config->enable_popup);
		if( $this->enable_popup == 'global' ) {
			$this->enable_popup = $this->config->enable_popup;						
		}
		
		$this->ratio = $this->params->get('ratio', $this->config->ratio);
		
		$filterby = $this->params->get('filterby', 'none');
		$orderby  = $this->params->get('orderby');
		
		$this->videos = $model->getVideos( $this->rows * $this->cols, $filterby, $orderby, $this->config->schedule_video_publishing );
		$this->pagination = $model->getPagination( $filterby, $this->config->schedule_video_publishing );
		
		$this->categories = $model->getCategories( $orderby );
		
		if( empty( $this->videos ) && empty( $this->categories ) ) {
			$app->enqueueMessage( JText::_('YENDIF_VIDEO_SHARE_ITEM_NOT_FOUND'), 'notice' );
			return true;
		}
		
		$show_feed = $this->params->get('show_feed', $this->config->show_feed);
		if( $show_feed == 'global' ) {
			$show_feed = $this->config->show_feed;
		}
		$this->rss_feed = $show_feed ? $this->getFeedLink() : '';
		
        $this->setHeader();	
		$this->addBreadcrumbs();
				
        parent::display($tpl);
		
    }
	
	private function setHeader() {
	
		JHtml::_('jquery.framework');
		
		$app = JFactory::getApplication();
		$document = JFactory::getDocument();
		
		$document->setTitle( $document->getTitle() . ' - ' . $this->item->name );
		
		$description = '';
		if( $this->params->get('menu-meta_description') ) $description = $this->params->get('menu-meta_description');
		if( ! empty( $this->item->meta_description ) ) $description = $this->item->meta_description;
		if( empty( $description ) && ! empty( $this->item->description ) ) $description = YendifVideoShareUtils::Truncate( $this->item->description );
		if( ! empty( $description ) ) $document->setDescription( $description );
		
		if( $this->params->get('menu-meta_keywords') ) $document->setMetadata( 'keywords', $this->params->get('menu-meta_keywords') );
		if( ! empty( $this->item->meta_keywords ) ) $document->setMetaData( 'keywords' , $this->item->meta_keywords );
		
		if( $this->params->get('robots') ) $document->setMetadata( 'robots', $this->params->get('robots') );
		
		$doc_data = $document->getHeadData();
		$url        = JURI::root();
		$sch        = parse_url( $url, PHP_URL_SCHEME );
		$server     = parse_url( $url, PHP_URL_HOST );
		$canonical_url = YendifVideoShareUtils::buildRoute( $this->item, 'category' ); 
		$newtag     = '<link rel="canonical" href="'.$sch.'://'.$server.$canonical_url.'"/>';

		$replaced = false;
		foreach( $doc_data['custom'] as $key => $c ) {
    		if( strpos( $c, 'rel="canonical"' ) !== FALSE ) {
        		$doc_data['custom'][ $key ] = $newtag;
        		$replaced = true;
    		}
		}
		
		if( ! $replaced ) {
    		$doc_data['custom'][] = $newtag;
		}

		$document->setHeadData( $doc_data );

		if( $this->config->bootstrap_version == 3 ) {
			$document->addStyleSheet( YendifVideoShareUtils::prepareURL('media/yendifvideoshare/assets/site/css/bootstrap.css','text/css','screen' ));
		}
		if( $this->enable_popup ) {
			$document->addStyleSheet( YendifVideoShareUtils::prepareURL('media/yendifvideoshare/assets/site/css/magnific-popup.css', 'text/css','screen' ));
		}
		$document->addStyleSheet( YendifVideoShareUtils::prepareURL( 'media/yendifvideoshare/assets/site/css/yendifvideoshare.css','text/css','screen' ));
		if( ! empty ( $this->config->responsive_css ) ) {
			$document->addStyleDeclaration( $this->config->responsive_css );
		}
		
		if( $this->enable_popup ) {
			$document->addScript( YendifVideoShareUtils::prepareURL('media/yendifvideoshare/assets/site/js/jquery.magnific-popup.min.js' ));
		}
		$document->addScript( YendifVideoShareUtils::prepareURL('media/yendifvideoshare/assets/site/js/yendifvideoshare.js' ));	
			
	}
	
	private function addBreadcrumbs() {
	
		jimport( 'joomla.application.pathway' );
		
		$app = JFactory::getApplication();
		$db = JFactory::getDBO();

		$breadcrumbs = $app->getPathway();
		
		$crumbs = array();
		$index  = 0;		
		
		// hack to force the correct sef url for the component menu
		$brd = $breadcrumbs->getPathway();
		if( ! empty( $brd[0]->link ) ) {
			$brd[0]->link = preg_replace( '/&?option=com_yendifvideoshare/', '', $brd[0]->link );
			$brd[0]->link = preg_replace( '/&?view=video/', '', $brd[0]->link );
			$breadcrumbs->setPathway( $brd );
		}
		// end hack 
		
		if( ! $this->item->parent == 0 ) {
			$query = 'SELECT * FROM #__yendifvideoshare_categories WHERE id = '.$this->item->parent;
			$db->setquery($query);
			$parent_category = $db->loadObject();				
					
			if( $parent_category->parent != 0 ) {
				$query = 'SELECT * FROM #__yendifvideoshare_categories WHERE id = '.$parent_category->parent;
				$db->setquery($query);
				$top_category = $db->loadObject();
				
				$crumbs[$index][0] = $top_category->name;
				$crumbs[$index][1] = YendifVideoShareUtils::buildRoute( $top_category, 'category' );
				$index++;	
			}
			
			$crumbs[$index][0] = $parent_category->name;
			$crumbs[$index][1] = YendifVideoShareUtils::buildRoute( $parent_category, 'category' );
			$index++;
		}		
		
        $crumbs[$index][0] = $this->item->name;
		$crumbs[$index][1] = YendifVideoShareUtils::buildRoute( $this->item, 'category' );

		for( $i = 0, $n = count( $crumbs ); $i < $n; $i++ ) {
			$breadcrumbs->addItem( $crumbs[$i][0], $crumbs[$i][1] );
		}
		
    }
	
	private function getFeedLink(){	

		$url = JRoute::_( 'index.php?option=com_yendifvideoshare&view=category&id='.$this->item->id.':'.$this->item->alias.'&format=feed&type=rss' );
		return '<a class="rss_icon" href="'.$url.'" target="_blank"><img src="'.$this->config->feed_icon.'"/></a>';
				
	}
	
}