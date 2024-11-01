<?php 
function addingShortCodes(){
    global $wpdb;
    $tablename = $wpdb->prefix . 'three_viewer';
    $ourQuery = $wpdb->prepare("SELECT * FROM $tablename LIMIT 100");
    $viewers = $wpdb->get_results($ourQuery);
    $num = count($viewers) + 1;
   
  

    for ($i=0; $i < $num; $i++) { 


      $x = $i + 1;
 
      add_shortcode("wp_three_viewer$i",function($atts =[],$content = null,$tag = ''){
        $attributes = shortcode_atts(
          array(
             'height'=> '',
             'width' => '',
         
           ), 
          $atts
      );
      $no_whitespacesWidth = preg_replace( '/\s*,\s*/', ',', filter_var( $attributes['width'], FILTER_SANITIZE_STRING ) ); 
      $no_whitespacesHeight = preg_replace( '/\s*,\s*/', ',', filter_var( $attributes['height'], FILTER_SANITIZE_STRING ) ); 
    
      $width_array = explode( ',', $no_whitespacesWidth );
      $height_array = explode( ',', $no_whitespacesHeight );

    global $wpdb;
    $tablename = $wpdb->prefix . 'three_viewer';
    $ourQuery = $wpdb->prepare("SELECT * FROM $tablename LIMIT 100");
    $viewers = $wpdb->get_results($ourQuery);
     $nud = str_replace("wp_three_viewer","",$tag);

        

         ?>
        
          <canvas class="viewer_canvas" id="viewer_canvas_<?php echo esc_attr($viewers[$nud - 1] -> id) ?>" data-bg="<?php echo esc_attr($viewers[$nud - 1] -> bgcolor) ?>" data-height="<?php echo esc_attr($height_array[0]) ?>" data-width="<?php echo esc_attr($width_array[0]) ?>" data-model="<?php echo esc_attr($viewers[$nud - 1] -> content) ?>"data-code="<?php echo esc_attr($viewers[$nud - 1] -> setup) ?>"></canvas>
        <?php

      });

    }

}





