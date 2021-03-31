/*
 * @version		$Id: yendifvideoshare.js 1.2.6 05-05-2017 $
 * @package		Yendif Video Share
 * @copyright   Copyright (C) 2014-2017 Yendif Technologies (P) Ltd 
 * @license     GNU/GPL http://www.gnu.org/licenses/gpl-2.0.html
*/

if( typeof( yendif ) === 'undefined' ) {
    var yendif = {};
};

yendif.fields = {};
yendif.files = 0;

jQuery(document).ready(function() {
			
	// Magnific Popup 
	if( jQuery.fn.magnificPopup !== undefined ) {
		var yendif_ratio = parseFloat( jQuery(this).data('ratio') ) || 0.5625;
		jQuery('.yendif-popup-gallery').magnificPopup({ 
			delegate: 'li', // the selector for gallery item
			type: 'iframe',
			overflowY: 'auto',			
			removalDelay: 300,
			mainClass: 'yendif-video-share-popup',
			iframe: { //to create title, close, iframe, counter div's
				markup: '<div class="mfp-title-bar">'+
							'<h2 class="mfp-title">Default Title</h2>'+
							'<div class="mfp-close" title="Close (Esc)"></div>'+
						'</div>'+							
						'<div class="mfp-iframe-scaler" style="padding-top:'+( yendif_ratio * 100 )+'%;" >'+            												
							'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+																								
						'</div>'+
						'<div class="mfp-bottom-bar">'+
							'<div class="mfp-counter"></div>'+								
						'</div>'																								        			
			},		
			callbacks: { //to assign title 									
				markupParse: function(template, values, item) {						 							
					values.title = item.el.attr('data-title');					
				}																			
			},		
			gallery: { //to build gallery				
				enabled: true,
				navigateByImgClick: true,
				tPrev: 'Previous',
				tNext: 'Next'													
			}									
		});	
	};
	
	// Rating
	jQuery( 'body' ).on( 'click', 'a.yendif-rating-trigger', function( e ) {
		e.preventDefault();
		
		var rating  = jQuery( this ).data( 'value' ),		
			videoid = jQuery( this ).data( 'id' ),
			userid  = yendif.userid,
			base    = yendif.base;
	
		if( yendif.allow_guest_rating == 0 && userid == 0 ) {
			alert( yendif.alert_message );
			return false;
		};

		document.getElementById("yendif-ratings-widget").innerHTML = '<span class="yendif-preloader"></span>';
		var xmlhttp;

   		if( window.XMLHttpRequest ) {
   			xmlhttp = new XMLHttpRequest();
   		} else {
   			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
   		};

   		xmlhttp.onreadystatechange = function() {
   			if( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
				if( xmlhttp.responseText ) {		    
					document.getElementById("yendif-ratings-widget").innerHTML = xmlhttp.responseText;
				};
       		};
   		};	

		xmlhttp.open( "GET", base + "index.php?option=com_yendifvideoshare&view=ajax&task=ratings&format=raw&rating=" + rating + "&videoid=" + videoid, true );
   		xmlhttp.send();
			
		return false;
		
	});
	
	// Likes & Dislikes
	jQuery( 'body' ).on( 'click', '.yendif-like-btn, .yendif-dislike-btn', function( e ) {
		e.preventDefault();
		
		var like    = jQuery( this ).data( 'like' ),
			dislike = jQuery( this ).data( 'dislike' ),
			videoid = jQuery( this ).data( 'id' ),
			userid  = yendif.userid,
			base    = yendif.base;
	
		if( yendif.allow_guest_like == 0 && userid == 0 ) {
			alert( yendif.alert_message );
			return false;
		};

		document.getElementById("yendif-likes-dislikes-widget").innerHTML = '<span class="yendif-preloader"></span>';
		var xmlhttp;

   		if( window.XMLHttpRequest ) {
   			xmlhttp = new XMLHttpRequest();
   		} else {
   			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
   		};

   		xmlhttp.onreadystatechange = function() {
   			if( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
				if( xmlhttp.responseText ) {	
					document.getElementById("yendif-likes-dislikes-widget").innerHTML = xmlhttp.responseText;
				};
       		};
   		};	

		xmlhttp.open( "GET", base + "index.php?option=com_yendifvideoshare&view=ajax&task=likes_dislikes&format=raw&likes=" + like + "&dislikes=" + dislike + "&videoid=" + videoid, true );
   		xmlhttp.send();
			
		return false;
		
	});
	
	// Show or Hide media fields according to the "Type" selected
	jQuery( '#type', '.yendif-media-types' ).on( 'change', function() {	
		var num_fields = jQuery('.yendif-media-fields').length;
		var option = jQuery( this ).val();
		jQuery( '.yendif-media-fields' ).fadeOut( 200, function() {
			if( --num_fields > 0 ) return;
			jQuery( '.yendif-type-'+option ).fadeIn(200);
			
			jQuery( '.yendif-media-required' ).removeClass( 'required' );
			switch( option ) {
				case 'video' :
					jQuery( '#mp4' ).addClass( 'required' );
					break;
				case 'rtmp' :
					jQuery( '#rtmp, #flash' ).addClass( 'required' );
					break;
				default :
					jQuery( '#'+option ).addClass( 'required' );
			};
		});	
	}).change();
	
	// Show or Hide more video formats
	jQuery( '#yendif-more-formats' ).on( 'click', function( e ) {
		e.preventDefault();

		if( jQuery( '#yendif-more-text' ).hasClass( 'hide' ) ) {
			jQuery( '#yendif-more-text' ).removeClass( 'hide' );
			jQuery( '#yendif-less-text' ).addClass( 'hide' );
			jQuery( '#yendif-more-formats-container' ).addClass( 'hide' );
		} else {
			jQuery( '#yendif-more-text' ).addClass( 'hide' );
			jQuery( '#yendif-less-text' ).removeClass( 'hide' );
			jQuery( '#yendif-more-formats-container' ).removeClass( 'hide' );
		};
	});
	
	// Show or Hide browse button
	jQuery( '.yendif-media-uploader-widget input[type="radio"]' ).on( 'change', function() {
		jQuery( this ).closest( '.yendif-media-uploader-widget' ).find( 'button' ).toggle();
	});
	
	// Trigger upload
	jQuery( '.yendif-media-uploader-widget .yendif-browse-btn' ).on( 'click', function( e ) {

		var id = document.getElementById('yendif-insert-id').value,
			field = jQuery( this ).data( 'field' ),
			accept = jQuery( this ).data( 'accept' ),
			iframe_id = 'yendif-upload-iframe-'+field,
			base = yendif.base;
		
		if( typeof yendif.fields[ field ] === 'undefined' ) {
			yendif.fields[ field ] = true;
			
			jQuery( '#yendif-media-uploader' ).append( '<form name="yendif-upload-form-'+field+'" id="yendif-upload-form-'+field+'" target="'+iframe_id+'" action="'+base+'index.php?option=com_yendifvideoshare&view=upload&format=raw&id='+id+'&f='+field+'" method="post" enctype="multipart/form-data" encoding="multipart/form-data"><input type="file" name="upload_'+field+'" id="yendif-upload-field-'+field+'" class="yendif-upload-field"  accept="'+accept+'" data-field="'+field+'" /></form>' );
		};
		
		jQuery('#yendif-upload-field-'+field).trigger('click');
		
	});
	
	// Do upload
	jQuery('body').on( 'change', '.yendif-upload-field', function() {
		
			var field = jQuery( this ).data( 'field' );
			
			var $browse_button = jQuery( '#yendif-browse-btn-'+field ),			
				iframe_id = 'yendif-upload-iframe-'+field;
			
			jQuery( '#yendif-media-uploader' ).append( '<iframe id="'+iframe_id+'" name="'+iframe_id+'" width="0" height="0" border="0" style="width:0; height:0; border:0;"></iframe>' );
		
			window.frames[ iframe_id ].name = iframe_id;
		
			var $value_field = document.getElementById( field ),
				$form_elem   = document.getElementById( 'yendif-upload-form-'+field ),
				$file_elem   = document.getElementById( 'yendif-upload-field-'+field ),
				$iframe_elem = document.getElementById( iframe_id ),
				$resp_elem   = document.getElementById( 'yendif-upload-response-'+field );
			
			// Add event...
   			var yendif_upload_handler = function() {		
   				if( $iframe_elem.detachEvent ) {
					$iframe_elem.detachEvent("onload", yendif_upload_handler);
				} else {
					$iframe_elem.removeEventListener("load", yendif_upload_handler, false);
				};

       			// Message from server...
				var content = null;
		
				if( $iframe_elem.contentWindow && $iframe_elem.contentWindow.document.body ) {
   					content = $iframe_elem.contentWindow.document.body.innerHTML;
				} else if( $iframe_elem.document && $iframe_elem.document.body ) {
   					content = $iframe_elem.document.body.innerHTML;
				} else if( $iframe_elem.contentDocument && $iframe_elem.contentDocument.body ) {
   					content = $iframe_elem.contentDocument.body.innerHTML;
				};

				--yendif.files;
		
				if( content == '' ) content = 'unknown_error';
				
				if( /invalid_file_type|invalid_file_size|invalid_mime_type|error_moving_file|unknown_error/.test(content) ) {
					$value_field.value = '';
					$resp_elem.innerHTML = '<span class="yendif-upload-failed"></span>' + yendif.msg[content] + ' - <a href="javascript:void(0);" onclick="yendif_reset_upload(\''+field+'\');">' + yendif.msg['retry'] + '</a>';
				} else {
					$value_field.value = content;
					$resp_elem.innerHTML = '<span class="yendif-upload-success"></span>' + yendif.msg['success'] + ' - <a href="javascript:void(0);" onclick="yendif_reset_upload(\''+field+'\');">' + yendif.msg['reset'] + '</a>';
				};
				
			};

   			if( $iframe_elem.addEventListener ) {
				$iframe_elem.addEventListener("load", yendif_upload_handler, true);
			};
	
   			if( $iframe_elem.attachEvent ) {
				$iframe_elem.attachEvent("onload", yendif_upload_handler);
			};
	
   			// Submit the form...	
   			$form_elem.submit();
			++yendif.files;
	
			$browse_button.hide();
			var file_elem_path = $file_elem.value.substring($file_elem.value.lastIndexOf("\\") + 1, $file_elem.value.length);
			$resp_elem.innerHTML = '<span class="yendif-upload-preloader"></span>' + file_elem_path + ' - <a href="javascript:void(0);" onclick="yendif_abort_upload(\''+field+'\');">' + yendif.msg['cancel'] + '</a>';
		
		});

});


function yendif_abort_upload( field ) {
	var iframe_id = 'yendif-upload-iframe-'+field;
	
	var $browse_button = jQuery( '#yendif-browse-btn-'+field ),	
		$value_field   = document.getElementById( field ),
		$resp_elem     = document.getElementById( 'yendif-upload-response-'+field ),
		$iframe_elem   = document.getElementById( iframe_id );

	if( $iframe_elem.contentWindow.stop ) {
    	$iframe_elem.contentWindow.stop();
    } else {
    	$iframe_elem.contentWindow.document.execCommand('Stop');
    };
	
	--yendif.files;
	
	$browse_button.show();	
	$value_field.value   = '';
	$resp_elem.innerHTML = '';	
	$iframe_elem.parentNode.removeChild( $iframe_elem );
	
	return false;
};

function yendif_reset_upload( field ) {	
	var iframe_id = 'yendif-upload-iframe-'+field;
	
	var $browse_button = jQuery( '#yendif-browse-btn-'+field ),	
		$value_field   = document.getElementById( field ),
		$resp_elem     = document.getElementById( 'yendif-upload-response-'+field ),
		$iframe_elem   = document.getElementById( iframe_id );
		
	$browse_button.show();	
	$value_field.value   = '';
	$resp_elem.innerHTML = '';
	$iframe_elem.parentNode.removeChild( $iframe_elem );
	
	return false;
};

// Initialize Player
(function( $ ) {
	'use strict';
	
	function yendifSetPlaylistPlayerHeight ( ) {
	
		if ( jQuery( window ).width() > 480 ) {
		
			jQuery( '.yendif-playlist-container' ).each(function() { 
														 
				var currentHeight = jQuery( this ).find( '.yendifplayer' ).outerHeight();
				jQuery( this ).find( '.vjs-playlist' ).css( {'height':+ currentHeight +'px' });
			
			});
		
		}
	}
	
	
	function yendifGetPlayerOption( $elem, prop, type ) {

		var val;
		
		if ( $elem.data( prop ) != "undefined" ) {
			val = $elem.data( prop );
		}
		
		if ( $elem.data( prop ) == null ) {
			val = yendifplayer[ prop ];
		}

		if ( 'bool' == type ) {
			return ( val == 1 ) ? true : false;
		} else if ( 'int' == type ) {
			return parseInt( val );
		} else {
			return val;
		}
		
	}
	
	function yendifShowSkipAd( $this, seconds ) {
		setTimeout(function() {												 
			$this.find( '.yendif-ad-skip-button' ).removeClass( 'vjs-hidden' ).addClass( 'vjs-block' );									
		}, seconds );
	}
	
	function yendifResetAdControls( $this ) {
		$this.find( '.yendif-ad-skip-button' ).addClass( 'vjs-hidden' ).removeClass( 'vjs-block' );			
	}
	
	function yendifAdImpression( id ) {
		
		var __url = yendifplayer.baseurl + 'index.php?option=com_yendifvideoshare&view=ajax&format=raw&task=updateimpressions&id=' + id;
		$.get( __url, function( data ) {
			// console.log( 'Ad Impression: ' + id );
		});
	};
	
	function yendifViewCount( id ) {
		
		var __url = yendifplayer.baseurl + 'index.php?option=com_yendifvideoshare&view=ajax&format=raw&task=updateviews&id=' + id;
		$.get( __url, function( data ) {
			// console.log( 'View Count: ' + id );
		});
		
	};
	
	function yendifAdClick( id ) {
		
		var __url = yendifplayer.baseurl + 'index.php?option=com_yendifvideoshare&view=ajax&format=raw&task=updateclicks&id=' + id;
		$.get( __url, function( data ) {
			// console.log( 'Ad Click: ' + id );
		});
		
	};

	function yendifParseVideoCaptions ( $elem ) {
		
		var textTracks = [];
		
		// caption
		if ( $elem.data( 'captions' ) != 'undefined' ) {
			textTracks.push({
				src: $elem.data( 'captions' ),
				kind: 'captions',
				srclang: 'en',
				label: 'English',
				default: true
			});
		} 
		
		return textTracks;
	}
	function yendifParseVideoSources( $elem ) {
		
		var sources = [];
		

		// MP4
		if ( $elem.data( 'mp4' ) ) {
			
			sources.push({ 
				src: $elem.data( 'mp4' ) + '?SD',
				type: 'video/mp4',
				label:'SD', 
				res:480
			});
			
			if ( $elem.data( 'hd' ) ) {
				sources.push({ 
					src: $elem.data( 'hd' ) + '?HD',
					type: 'video/mp4', 
					label:'HD', 
					res:1080							 
				});
			}			
		}
		
		// YouTube
		if ( $elem.data( 'youtube' ) ) {				
			sources.push({ 
				src: $elem.data( 'youtube' ),
				type: 'video/youtube'
			});
		}
		
		// YouTube
		if ( $elem.data( 'rtmp' ) ) {				
			sources.push({ 
				src: $elem.data( 'rtmp' ) + $elem.data( 'flash' ),
				type: 'rtmp/flv'
			});
		}
		
		// Hls
		if ( $elem.data( 'mpegurl' ) ) {				
			sources.push({ 
				src: $elem.data( 'mpegurl' ) ,
				type: 'application/x-mpegurl'
			});
		}
		
		return sources;
		
	}
		
	function yendifgetCookie( name ) {
		var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		return v ? v[2] : null;
	}
	
	function yendifsetCookie( name, value ) {
		document.cookie = name + "=" + value;
	}
	
	function yendifSocilshare( player, shareUrl, currentVideoId ) {
		
		player.share({
					title: yendif.i18n['share_title'] || '',
					embed: yendif.i18n['embed_title'] || '',
					code: '<iframe width="560" height="315" src="' + yendifplayer.baseurl + 'index.php?option=com_yendifvideoshare&view=video&id=' + currentVideoId + '&tmpl=component" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
					url: encodeURIComponent( shareUrl ),
					icon: {
						title: 'Yendifvideoshare',
						fb: {
							image: yendifplayer.baseurl + 'media/yendifvideoshare/player/images/facebook.png', 
							url: 'https://www.facebook.com/sharer.php?u=' 
						},
						twitter: {
							image: yendifplayer.baseurl + 'media/yendifvideoshare/player/images/twitter.png',
							url: 'https://twitter.com/intent/tweet?url='
						},
						google: {
							image: yendifplayer.baseurl + 'media/yendifvideoshare/player/images/gplus.png',
							url: 'https://plus.google.com/share?url='
						},
						vk: {
							image: yendifplayer.baseurl + 'media/yendifvideoshare/player/images/linkedin.png', 
							url: 'https://www.linkedin.com/shareArticle?url='
						},
						ok: {
							image: yendifplayer.baseurl + 'media/yendifvideoshare/player/images/pinterest.png', 
							url: 'https://pinterest.com/pin/create/bookmarklet/?media='
						}
					}
				});
	}

	
	/**
	 * Called when the page has loaded.
	 *
	 * @since 1.0.0
	 */
	$(function() {
		
		$( '.yendifplayer' ).each(function() {
			
			var $this = $( this );
			var id = $this.data( 'id' );
			var currentVideoId = $this.data( 'vid' );
			var shareUrl = $this.data( 'shareurl' );
	
			// Initialize the Player
			//youtube: { enablejsapi: 1 },
			var player = videojs( id, {				
				bigPlayButton: yendifGetPlayerOption( $this, 'playbtn', 'bool' ),
				autoplay: yendifGetPlayerOption( $this, 'autoplay', 'bool' ),
				loop: yendifGetPlayerOption( $this, 'loop', 'bool' ),
				nativeControlsForTouch: false,
				customControlsOnMobile: true,
				playsinline: 1,
				controls: true,
				controlBar: {
					playToggle: yendifGetPlayerOption( $this, 'playpause', 'bool' ),
					currentTimeDisplay: yendifGetPlayerOption( $this, 'currenttime', 'bool' ), 
					progressControl: yendifGetPlayerOption( $this, 'progress', 'bool' ),
					durationDisplay: yendifGetPlayerOption( $this, 'duration', 'bool' ),
					remainingTimeDisplay: true,
					volumePanel: yendifGetPlayerOption( $this, 'volumebtn', 'bool' ),
					fullscreenToggle: yendifGetPlayerOption( $this, 'fullscreen', 'bool' ),
					children: {
						playToggle:true,
						currentTimeDisplay: true, 
						progressControl: true,
						durationDisplay: true,
						remainingTimeDisplay: true,
						volumePanel: true,
						fullscreenToggle: true
					}
				}
			});			
			
			// Call to analytics 
			var hasAnalytics = yendifGetPlayerOption( $this, 'analytics', 'bool' );
			if( hasAnalytics ) {
				player.analytics({
					events: [
						{
						  name: 'play',
						  label: 'video play',
						  action: 'play',
						},
						{
						  name: 'pause',
						  label: 'video pause',
						  action: 'pause',
						},
						{
						  name: 'ended',
						  label: 'video ended',
						  action: 'ended',
						}
					]
				});	
			}
			
			// Call to quality resolution switcher
			//player.videoJsResolutionSwitcher();	
			
			$( '.'+ id ).removeClass( 'vjs-wating' );
			
			// Initialize Embed & Socialsharing
			var hasShare = 0;
			var hasEmbed = yendifGetPlayerOption( $this, 'embed', 'bool' );
			if( ! shareUrl ) { shareUrl = window.location; }
			
			if ( hasShare || hasEmbed ) {
				yendifSocilshare( player, shareUrl, currentVideoId );
			}
			
			// Initialize download
			var hasDownload = 0;
			
			if ( hasDownload ) {
				player.vjsdownload( yendifplayer.baseurl + 'index.php?option=com_yendifvideoshare&view=download&id=' + currentVideoId );
			}
			
			// to set the Volume on controlbar
			var hasVolume = yendifGetPlayerOption( $this, 'volume', 'int' );
			if( hasVolume ){
				player.volume( hasVolume/100 );
			}
			
			// Initialize ads
			var isRTMP = /rtmp:/.test( player.src() );
			var prerollAds = $this.data( 'prerollad' );
			var postrollAds = $this.data( 'postrollad' );			
			
			if( ! isRTMP && ( prerollAds || postrollAds ) ) {
				
				var canSkipAds = yendifGetPlayerOption( $this, 'can_skip_adverts', 'bool' );
				var showAdsTimeframe = yendifGetPlayerOption( $this, 'show_adverts_timeframe', 'bool' );
				var showSkipAdsTime = yendifGetPlayerOption( $this, 'show_skip_adverts_on', 'int' );
				var prerollId = $this.data( 'prerollid' );
				var postrollId = $this.data( 'postrollid' );
				var prerollTarget = $this.data( 'prerolltarget' );
				var postrollTarget = $this.data( 'postrolltarget' );				

				// Call the advertisment plugin
				player.ads();
				
				// Add neccessary ui elements
				$this.find( '.vjs-control-bar' ).before( "<div class='yendif-ad-bg'></div>");					
				$this.find( '.vjs-remaining-time' ).before( "<div class='yendif-ad-text'>" + yendif.i18n['avertisment'] + "</div>" );
				$this.find( '.vjs-control-bar' ).before( "<div class='yendif-ad-skip-button vjs-hidden'><span class='vjskip-text'>" +  yendif.i18n['show_skip']  + "</span><span class='vjs-icon-skip'></span></div>" );	
				
				if ( ! showAdsTimeframe ) {
					$this.find( '.vjs-control-bar' ).addClass( 'yendif-ad-controls-hidden' );
				}
				
				
				if ( prerollAds ) {
					
					player.on( 'readyforpreroll', function() {						
						player.ads.startLinearAdMode();
						player.src( prerollAds );						
						
						player.one( 'adplaying', function() {
							player.trigger( 'ads-ad-started' );
							yendifAdImpression( prerollId );
						});
					
						player.one( 'adended', function() {
							player.ads.endLinearAdMode();						
							yendifResetAdControls( $this );
						});
						
						// Listen to ad click event
						if ( '' != prerollTarget ) {	
							$this.find( '.yendif-ad-bg' ).click(function() {	
								yendifAdClick( prerollId );
								window.open( prerollTarget, '_blank' );
							});
						}
					
						// Show skip ads button if applicable
						if ( canSkipAds ) {
							yendifShowSkipAd( $this, showSkipAdsTime * 1000 );
						}
						
					});
					
					// Start Ads
					player.trigger( 'adsready' );
					
				}
				
				// Initialize for postroll ads
				if ( postrollAds ) {
					
					player.on( 'readyforpostroll', function() {			
						player.ads.startLinearAdMode();
						player.src( postrollAds );
						
						player.one( 'adplaying', function() {
							player.trigger( 'ads-ad-started' );
							yendifAdImpression( prerollId );
						});
						
						player.one( 'adended', function() {
							player.ads.endLinearAdMode();
							yendifResetAdControls( $this );
						});
						
						// Listen to ad click event
						if ( '' != postrollTarget ) {	
							$this.find( '.yendif-ad-bg' ).click(function() {	
								yendifAdClick( postrollId );
								window.open( postrollTarget, '_blank' );
							});
						}

						// Show skip ads button if applicable
						if ( canSkipAds ) {
							yendifShowSkipAd( $this, showSkipAdsTime * 1000 );
						}					
					});	
					
					// Start Ads
					player.trigger( 'adsready' );
					
				}				
		
				// Listen to "skip" event
				$this.find( '.yendif-ad-skip-button' ).click(function() {
					player.ads.endLinearAdMode();
					yendifResetAdControls( $this );
				});

			}		
			
			// Initialize playlist		
			var hasPlaylist = $( '#vjs-playlist-data-' + id ).length;
			
			if ( hasPlaylist ) {
				
				var items = [];
				
				$( '.vjs-playlist-item', '#vjs-playlist-data-' + id ).each(function() { 

					items.push({
						id: $( this ).data( 'vid' ),
						url: $( this ).data( 'shareurl' ),
						name: $( this ).data( 'title' ),
						description: $( this ).data( 'description' ) || '',
						duration: $( this ).data( 'duration' ) || '',
						sources: yendifParseVideoSources( $( this ) ),
						//textTracks: yendifParseVideoCaptions( $( this ) ),
						poster: $( this ).data( 'poster' ) || '',
						thumbnail: [
							{ 
								srcset: $( this ).data( 'poster' ) || '',
								ype: 'image/jpeg',
								media: '(min-width: 400px;)'
							},
							{
								src: $( this ).data( 'poster' ) || ''
							}
							
						  ]
					});									
																			
				});
				
				// Call the playlist function to build playlist
				player.playlist( items );
			
				// Initialize the playlist-ui plugin
				player.playlistUi({
					className: 'vjs-playlist-' + id
				});				
				
				// Autoplay playlist videos
				var canAutoAdvance = yendifGetPlayerOption( $this, 'autoplaylist', 'bool' );
				
				if ( canAutoAdvance ) {
					player.playlist.autoadvance(1);
				}
				
				// Listen to playlist change event
				currentVideoId = $( '.vjs-playlist-' + id + ' li.vjs-selected' ).data( 'id' );
				shareUrl = $( '.vjs-playlist-' + id + ' li.vjs-selected' ).data( 'shareurl' );

				player.on( 'loadstart', function() {
					
					$this.find( id ).removeClass( 'vjs-waiting' );	
					
					var _currentVideoId = $( '.vjs-playlist-' + id + ' li.vjs-selected' ).data( 'id' );
					var _shareUrl = $( '.vjs-playlist-' + id + ' li.vjs-selected' ).data( 'shareurl' );
					
					// Initialize Embed & Socialsharing
					var hasShare = 0;
					var hasEmbed = yendifGetPlayerOption( $this, 'embed', 'bool' );
					
					if ( hasShare || hasEmbed ) {
							yendifSocilshare( player, shareUrl, currentVideoId );
					}

					if ( _currentVideoId != currentVideoId ) { 
					
						currentVideoId = _currentVideoId;
						shareUrl = _shareUrl;

						// Update Resolution Switcher
						//player.disposeQualitySwitcher(); // Dispose the current switcher 
						//player.videoJsResolutionSwitcher(); // Initialize a new switcher 
						
						// Update Embedcode
						if ( hasEmbed ) {
							$this.find( '.vjs-share-code-text' ).val( '<iframe width="560" height="315" src="' + yendifplayer.baseurl + 'index.php?option=com_yendifvideoshare&view=video&id=' + currentVideoId + '&tmpl=component" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' );
						}
						
						if ( hasShare || hasEmbed ) {
							yendifSocilshare( player, shareUrl, currentVideoId );
						}
						
						// Update Download URL
						if ( hasDownload ) {
							player.vjsdownload( yendifplayer.baseurl + 'index.php?option=com_yendifvideoshare&view=download&id=' + currentVideoId );
						}
						
					}					
					
				});				
				
			}	
			
			yendifViewCount( currentVideoId );
			
		});	
		
		$( '.yendifgdprConsent' ).click(function() {
													  
			yendifsetCookie( 'yendif_gdpr_consent',1 );
			$('iframe').attr('src', function() { return jQuery(this).attr('data-src'); })
			.removeAttr('data-src');
			location.reload(true);
			
		});
		
		
		// Call the playlist height set
		yendifSetPlaylistPlayerHeight();
		
		$( window ).resize( function() {
									 
			yendifSetPlaylistPlayerHeight();
			
		});
				
	});
	
})( jQuery );



