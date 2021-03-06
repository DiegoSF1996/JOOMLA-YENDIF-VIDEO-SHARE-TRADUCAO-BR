CREATE TABLE IF NOT EXISTS `#__yendifvideoshare_categories` (
  	`id` int(5) NOT NULL AUTO_INCREMENT,
  	`name` varchar(255) NOT NULL,
  	`alias` varchar(255) NOT NULL,
  	`parent` int(10) NOT NULL,
	`description` TEXT NOT NULL,
  	`image` varchar(255) NOT NULL,  	
  	`access` varchar(25) NOT NULL,
  	`ordering` int(5) NOT NULL,
	`meta_keywords` text NOT NULL,
  	`meta_description` text NOT NULL,
	`created_date` TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
  	`published` TINYINT(4) NOT NULL,
  	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `#__yendifvideoshare_videos` (
  	`id` INT(5) NOT NULL AUTO_INCREMENT,
  	`title` VARCHAR(255) NOT NULL,
  	`alias` VARCHAR(255) NOT NULL,
	`catid` INT(5) NOT NULL,
	`description` TEXT NOT NULL,	
  	`type` VARCHAR(20) NOT NULL,
  	`youtube` VARCHAR(255) NOT NULL,
	`mp4` VARCHAR(255) NOT NULL,
	`mp4_hd` VARCHAR(255) NOT NULL,
	`rtmp` VARCHAR(255) NOT NULL,
	`flash` VARCHAR(255) NOT NULL,
	`webm` VARCHAR(255) NOT NULL,
	`ogg` VARCHAR(255) NOT NULL,
	`thirdparty` TEXT NOT NULL,
	`image` VARCHAR(255) NOT NULL,
	`captions` TEXT NOT NULL,
	`duration` VARCHAR(15) NOT NULL,
    `userid` INT(25) NOT NULL,  	
  	`access` VARCHAR(25) NOT NULL,
	`ordering` int(5) NOT NULL,
	`views` INT(5) NOT NULL,
	`meta_keywords` TEXT NOT NULL,
  	`meta_description` TEXT NOT NULL,
	`created_date` TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
	`rating` FLOAT(5, 2) NOT NULL,
	`featured` TINYINT(4) NOT NULL,
 	`published` TINYINT(4) NOT NULL,
	`published_up` TIMESTAMP NOT NULL,	
	`published_down` TIMESTAMP NOT NULL,
	`preroll` INT(10) NOT NULL,
	`postroll` INT(10) NOT NULL,
 	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `#__yendifvideoshare_config` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,	
	`allow_guest_like` TINYINT(4) NOT NULL,
	`allow_guest_rating` TINYINT(4) NOT NULL,
	`allow_subtitle` TINYINT(4) NOT NULL,
	`allow_rtmp_upload` TINYINT(4) NOT NULL,
	`allow_upload` TINYINT(4) NOT NULL,
	`allow_youtube_upload` TINYINT(4) NOT NULL,
	`allowed_extensions` TEXT NOT NULL,
	`analytics` VARCHAR(25) NOT NULL,
	`autoplay` TINYINT(4) NOT NULL,
	`autoplaylist` TINYINT(4) NOT NULL,
	`autopublish` TINYINT(4) NOT NULL,
	`bootstrap_version` INT(5) NOT NULL,
	`can_skip_adverts` TINYINT(4) NOT NULL,
	`comments` VARCHAR(25) NOT NULL,
	`controlbar` TINYINT(4) NOT NULL,
	`currenttime` TINYINT(4) NOT NULL,
	`default_image` VARCHAR(255) NOT NULL,
	`download` TINYINT(4) NOT NULL,
	`duration` TINYINT(4) NOT NULL,
	`embed` TINYINT(4) NOT NULL,
	`enable_adverts` VARCHAR(25) NOT NULL,
	`enable_popup` TINYINT(4) NOT NULL,
    `engine` VARCHAR(10) NOT NULL,
	`fb_app_id` VARCHAR(100) NOT NULL,
    `fb_color_scheme` VARCHAR(100) NOT NULL,
	`fb_comments_width` INT(5) NOT NULL,
	`fb_post_count` INT(5) NOT NULL,
	`fb_show_count` TINYINT(4) NOT NULL,
	`feed_icon` VARCHAR(255) NOT NULL,
	`feed_limit` TINYINT(4) NOT NULL,
	`feed_name` VARCHAR(255) NOT NULL,
	`feed_search` TINYINT(4) NOT NULL,
	`fullscreen` TINYINT(4) NOT NULL,
	`gallery_thumb_height` INT(5) NOT NULL,
	`gallery_thumb_width` INT(5) NOT NULL,
	`google_api_key` VARCHAR(255) NOT NULL,
	`ignored_extensions` TEXT NOT NULL,
	`illegal_mime_types` TEXT NOT NULL,
	`jcomments_show_count` TINYINT(4) NOT NULL,
	`jquery` VARCHAR(25) NOT NULL,
	`komento_show_count` TINYINT(4) NOT NULL,
	`keyboard` TINYINT(4) NOT NULL,
	`legal_mime_types` TEXT NOT NULL,
	`license` VARCHAR(50) NOT NULL,	
	`logo` VARCHAR(255) NOT NULL,
	`loop` TINYINT(4) NOT NULL,
	`max_upload_size` INT(10) NOT NULL,	
	`no_of_cols` INT(5) NOT NULL,
	`no_of_rows` INT(5) NOT NULL,
	`playbtn` TINYINT(4) NOT NULL,
	`player_height` INT(10) NOT NULL,
	`player_width` INT(10) NOT NULL,
	`playlist_desc_limit` INT(5) NOT NULL,
	`playlist_height` INT(10) NOT NULL,
	`playlist_position` VARCHAR(10) NOT NULL,
	`playlist_title_limit` INT(5) NOT NULL,
	`playlist_width` INT(10) NOT NULL,
	`playpause` TINYINT(4) NOT NULL,
	`poster_image_height` INT(5) NOT NULL,
	`poster_image_width` INT(5) NOT NULL,					
	`progress` TINYINT(4) NOT NULL,					
	`ratio` DECIMAL(16,4) NOT NULL,
	`resize_method` VARCHAR(25) NOT NULL,
    `responsive` TINYINT(4) NOT NULL,
	`responsive_css` TEXT NOT NULL,
	`schedule_video_publishing` TINYINT(4) NOT NULL,
	`share` TINYINT(4) NOT NULL,
	`share_script` TEXT NOT NULL,	
	`show_adverts_timeframe` TINYINT(4) NOT NULL,
	`show_category` TINYINT(4) NOT NULL,
	`show_date` TINYINT(4) NOT NULL,	
	`show_description` TINYINT(4) NOT NULL,
	`show_excerpt` TINYINT(4) NOT NULL,		
	`show_feed` TINYINT(4) NOT NULL,	
	`show_likes` TINYINT(4) NOT NULL,
	`show_media_count` TINYINT(4) NOT NULL,
	`show_rating` TINYINT(4) NOT NULL,
	`show_related` TINYINT(4) NOT NULL,
	`show_search` TINYINT(4) NOT NULL,	
	`show_skip_adverts_on` INT(5) NOT NULL,	
	`show_title` TINYINT(4) NOT NULL,
	`show_user` TINYINT(4) NOT NULL,
	`show_views` TINYINT(4) NOT NULL,			
	`theme` VARCHAR(10) NOT NULL,
	`thumb_height` INT(5) NOT NULL,	
	`thumb_width` INT(5) NOT NULL,	
	`video_desc_limit` INT(5) NOT NULL,		
	`volume` INT(5) NOT NULL,					
	`volumebtn` TINYINT(4) NOT NULL,
	`sef_cat` VARCHAR(255) NOT NULL,
	`sef_video` TINYINT(4) NOT NULL,		
	`sef_video_prefix` VARCHAR(255) NOT NULL,	
	`sef_sptr` TINYINT(4) NOT NULL,	
	`sef_position` TINYINT(4) NOT NULL,	
	`show_consent` TINYINT(4) NOT NULL,
	`progress_bar_color` VARCHAR(25) NOT NULL,	
  	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `#__yendifvideoshare_ratings` (
  	`id` int(5) NOT NULL AUTO_INCREMENT,
  	`userid` int(5) NOT NULL,
	`sessionid` VARCHAR(50) NOT NULL,
  	`videoid` int(5) NOT NULL,
	`rating` FLOAT(2, 1) NOT NULL,	
	`created_date` TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
  	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `#__yendifvideoshare_likes_dislikes` (
  	`id` int(5) NOT NULL AUTO_INCREMENT,
  	`userid` int(5) NOT NULL,
  	`videoid` int(5) NOT NULL,
	`sessionid` VARCHAR(50) NOT NULL,
	`likes` int(5) NOT NULL,
	`dislikes` int(5) NOT NULL,	
  	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `#__yendifvideoshare_adverts` (
  `id` INT(5) NOT NULL AUTO_INCREMENT,  
  `title` VARCHAR(255) NOT NULL,
  `cat_ids` TEXT NOT NULL,
  `type` VARCHAR(25) NOT NULL,
  `mp4` VARCHAR(255) NOT NULL,
  `link` VARCHAR(255) NOT NULL,
  `impressions` INT(10) NOT NULL,
  `clicks` INT(10) NOT NULL,
  `published` TINYINT(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;