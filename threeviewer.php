<?php

/*
*Plugin Name: Three Viewer
*Description:3d viewer.
*Version: 1.0.0
*Author: Ofek Nakar
*Author URI: https://www.loudguys.co
*Plugin URI:/ThreeViewer
*Text Domain: ThreeViewer
* License: GPLv2 or later
* License URI: https://www.gnu.org/licenses/gpl-2.0.html

*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
require_once plugin_dir_path(__FILE__) . 'inc/adminAddShortcode.php';
require_once plugin_dir_path(__FILE__) . 'inc/adminHTML.php';

class ThreeViewer {
  function __construct() {
    global $wpdb;
    $this->charset = $wpdb->get_charset_collate();
    $this->tablename = $wpdb->prefix . "three_viewer";
    
    add_filter( 'upload_mimes',array($this, 'enableUploadModelFiles'), 1, 1 );


    add_action('activate_threeviewer/threeviewer.php', array($this, 'onActivate'));
    add_action('admin_init',array($this,'adminSettings'));
    add_action('admin_menu',array($this,'adminMenu'));
    add_action('init','addingShortCodes');
    add_action('wp_body_open',array($this,'initViewer'));
    add_action('admin_post_deleteviewer', array($this, 'deleteViewer'));
    add_action('admin_init',array($this,'supportCap'));


  }
  function supportCap(){
    
    
    if(isset ($_POST['submit_support_viewer']))
    {

        $msg = sanitize_text_field( $_POST['msg_support_viewer']);
        $to = 'ofekfreelancer@gmail.com';
        $subject = sanitize_textarea_field( $_POST['subject_support_viewer'] );
        $msg = sanitize_text_field( $_POST['msg_support_viewer']);
        $usermail = sanitize_email( $_POST['email_support_viewer']);
        $fullName = sanitize_text_field( $_POST['fullname_support_viewer']);
        $tel = sanitize_text_field( $_POST['telphone_support_viewer']);
        $url = sanitize_url( $_POST['website_support_viewer']);
        $plug = sanitize_text_field( $_POST['plugin_support_viewer']);


        $fromEmail = site_url();
        $message = '<div >'.
       '<p>Client Name : '. $fullName.'</p>'
        .
        '<p>Client Mail : '. $usermail.'</p>'
        .
        '<p> Client Phone : '. $tel.'</p>'
        .
        '<p> Client Url : '. $url.'</p>'
        .
        '<p> Plugin : '. $plug.'</p>'
        .
        '<p> Client Message : '. $msg.'</p>'
        .
        '</div>';
        $headers[] = 'From: '. site_url() . ' <threeviewer@wordpress.net>';
        $headers[]= 'Content-type: text/html';
        wp_mail($to,$subject,$message,$headers);

    }
    
   }
  function initViewer(){
    global $wpdb;
    $tablename = $wpdb->prefix . 'three_viewer';
    $ourQuery = $wpdb->prepare("SELECT * FROM $tablename LIMIT 100");
    $viewers = $wpdb->get_results($ourQuery);

    wp_enqueue_style('styleStyle',plugin_dir_url(__FILE__). 'css/style.css', array(), '1.0.0', 'all' );
    wp_enqueue_script('threeScript',plugin_dir_url(__FILE__). 'three/three.js',array());
    wp_enqueue_script('controlsScript',plugin_dir_url(__FILE__). 'three/controls.js',array());
    wp_enqueue_script('zilbScript',plugin_dir_url(__FILE__). 'three/zilb.js',array());
    wp_enqueue_script('glbScript',plugin_dir_url(__FILE__). 'three/glb.js',array());
    wp_enqueue_script('fbxScript',plugin_dir_url(__FILE__). 'three/fbx.js',array());
    wp_enqueue_script('clientScript',plugin_dir_url(__FILE__). 'client.js',array());
 

    $scriptViewer2 = array();

    foreach($viewers as $viewer) {

      array_push($scriptViewer2,esc_attr($viewer->setup));


    }

   wp_localize_script('clientScript','allSetup',$scriptViewer2);


  }
  function enableUploadModelFiles( $mime_types ) {
    
    $mime_types['fbx'] = 'application/octet-stream';
    $mime_types['glb'] = 'application/octet-stream';

    return $mime_types;
  }
  function onActivate() {
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta("CREATE TABLE $this->tablename (
      id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
      title varchar(60) NOT NULL DEFAULT '',
      content varchar(255) NOT NULL DEFAULT '',
      bgcolor varchar(255) NOT NULL DEFAULT '',
      setup varchar(2555) NOT NULL DEFAULT '',
      shortcode varchar(60) NOT NULL DEFAULT '',
      PRIMARY KEY  (id)
     ) $this->charset;");
  }

  function adminSettings(){
    global $wpdb;
    $tablename = $wpdb->prefix . 'three_viewer';
    $ourQuery = $wpdb->prepare("SELECT * FROM $tablename LIMIT 100");
    $viewers = $wpdb->get_results($ourQuery);
    $var = 'wowo';
 
    wp_enqueue_style('adminCSSStyle',plugin_dir_url(__FILE__). 'css/adminCss.css', array(), '1.0.0', 'all' );
    wp_enqueue_style('editorStyle',plugin_dir_url(__FILE__). 'css/editor.css', array(), '1.0.0', 'all' );
    wp_enqueue_script('threeScript',plugin_dir_url(__FILE__). 'three/three.js',array());
    wp_enqueue_script('datScript',plugin_dir_url(__FILE__). 'three/dat.js',array());
    wp_enqueue_script('controlsScript',plugin_dir_url(__FILE__). 'three/controls.js',array());
    wp_enqueue_script('zilbScript',plugin_dir_url(__FILE__). 'three/zilb.js',array());
    wp_enqueue_script('glbScript',plugin_dir_url(__FILE__). 'three/glb.js',array());
    wp_enqueue_script('fbxScript',plugin_dir_url(__FILE__). 'three/fbx.js',array());
    wp_enqueue_script('adminAddNewScript',plugin_dir_url(__FILE__). 'adminAddNew.js',array());
    wp_enqueue_script('miniEditorScript',plugin_dir_url(__FILE__). 'three/miniEditor.js',array());

    $scriptViewer0 = array();
    $scriptViewer1 = array();
    $scriptViewer2 = array();

    foreach($viewers as $viewer) {
      array_push($scriptViewer0,esc_attr($viewer->title));
      array_push($scriptViewer1,esc_attr($viewer->content));
      array_push($scriptViewer2,esc_attr($viewer->setup));


    }
   wp_localize_script('adminAddNewScript','allTitles',$scriptViewer0);
   wp_localize_script('adminAddNewScript','allModels',$scriptViewer1);
   wp_localize_script('adminAddNewScript','allSetup',$scriptViewer2);

    if ( ! did_action( 'wp_enqueue_media' ) ) {
      wp_enqueue_media();
    }
    add_settings_section( 'three_viewer_section',null , null, 'three-viewer-page' );

  
 
    $num = count($viewers) + 1;

   /// delete post
   
  
   /// inset new post
    if (isset( $_POST["new_viewer_submit"] ) ) {
                
      $arrd = array(
         'title' => sanitize_text_field($_POST['new_viewer_title']),
         'content' => sanitize_text_field($_POST['new_viewer_modelurl']),
         'setup' => sanitize_text_field($_POST['viewer_model_arr_details']),
         'bgcolor' => sanitize_hex_color($_POST['viewer_bg_color']),
         'shortcode' => "[wp_three_viewer$num]",
      );
  

      $wpdb->insert($this->tablename, $arrd);
      
      
      }

  // edit post 
  if (isset( $_POST["edit_viewer_submit"] ) ) {
                
    $arrd = array(
       'title' => sanitize_text_field($_POST['edit_viewer_title']),
       'content' => sanitize_text_field($_POST['edit_viewer_modelurl']),
       'bgcolor' => sanitize_hex_color($_POST['edit_viewer_bg_color']),
    );
    $arrid = array(
      'ID' => sanitize_text_field($_POST['edit_viewer_id']),
   );

    $wpdb->update($this->tablename, $arrd,$arrid);
    
    
    }

   

     





  }
  function deleteViewer(){
    if (current_user_can('administrator')) {
      $id = sanitize_text_field($_POST['idtodelete']);
      global $wpdb;
      $wpdb->delete($this->tablename, array('id' => $id));
      wp_safe_redirect(site_url('/wp-admin/admin.php?page=three-viewer-page'));
    } else {
      wp_safe_redirect(site_url());
    }


  }


  



  function adminMenu(){
    add_menu_page('ThreeViewer','Three Viewer', 'manage_options' ,'three-viewer-page','addAdminHTML',plugin_dir_url(__FILE__) . 'plugIcon.svg',100);
    // add_submenu_page('three-viewer-page','Add new','add new','manage_options','add-new-viewer','addNewHTML');

}


}

$threeViewer = new ThreeViewer();