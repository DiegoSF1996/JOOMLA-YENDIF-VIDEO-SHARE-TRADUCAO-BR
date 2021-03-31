<?php 

/*
 * @version		$Id: default.php 1.2.7 06-08-2018 $
 * @package		Yendif Video Share
 * @copyright   Copyright (C) 2014-2018 Yendif Technologies (P) Ltd
 * @license     GNU/GPL http://www.gnu.org/licenses/gpl-2.0.html
*/

defined('_JEXEC') or die('Restricted access'); ?>

<div class="yendif-video-shares <?php echo $moduleclass_sfx; ?>">
	<?php if( $params->get('show_title') == 1 ) : ?>
		<h3><?php echo $video->title; ?></h3>
	<?php endif; ?>

	<?php echo $player; ?>

	<?php if( $params->get('show_description') == 1 ) : ?>
		<p><?php echo $video->description; ?></p>
	<?php endif; ?>
</div>