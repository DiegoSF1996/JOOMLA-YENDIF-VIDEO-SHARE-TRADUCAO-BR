<?php

/*
 * @version		$Id: mod_yendifvideoshare_player.php 1.2.7 06-08-2018 $
 * @package		Yendif Video Share
 * @copyright   Copyright (C) 2014-2018 Yendif Technologies (P) Ltd
 * @license     GNU/GPL http://www.gnu.org/licenses/gpl-2.0.html
*/
 
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
 
// Include the syndicate functions only once
require_once( dirname(__FILE__).DIRECTORY_SEPARATOR.'helper.php' );

require_once( JPATH_ROOT.DIRECTORY_SEPARATOR.'administrator'.DIRECTORY_SEPARATOR.'components'.DIRECTORY_SEPARATOR.'com_yendifvideoshare'.DIRECTORY_SEPARATOR.'libraries'.DIRECTORY_SEPARATOR.'player.php' );

require_once( JPATH_ROOT.DIRECTORY_SEPARATOR.'administrator'.DIRECTORY_SEPARATOR.'components'.DIRECTORY_SEPARATOR.'com_yendifvideoshare'.DIRECTORY_SEPARATOR.'libraries'.DIRECTORY_SEPARATOR.'utils.php' );

$config = YendifVideoShareUtils::getConfig();

$player_params = (array) json_decode( $params );
	
if( $video = YendifVideoSharePlayerHelper::getVideo( $params, $config->schedule_video_publishing ) ) {
	$playerObj = YendifVideoSharePlayer::getInstance();
	$player = $playerObj->singlePlayer( $player_params , $video ,'yendif-singleplayer-module');

	$moduleclass_sfx = htmlspecialchars( $params->get('moduleclass_sfx') );
	
	require( JModuleHelper::getLayoutPath('mod_yendifvideoshare_player') );
}