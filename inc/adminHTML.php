<?php 


function miniEditor(){
    ?>
          <div class="viewer_model_editor_holder">
              <div class="tab tabopen">close panel</div>
              <div class="tab tablight">lights</div>
              <div class="tab tabground">ground</div>
              <div class="tab tabmodel">model</div>

          </div>
          <div class="viewer_model_editor_menu">
              <div class="viewer_menu_lights viewer_menu_menu">
              <div class="viewer_menu_large_button viewer_add_pointlight">add PointLight</div>
              <div class="viewer_menu_large_button viewer_add_directlight">add DirectLight</div>
              <div class="viewer_menu_large_button viewer_add_spotlight">add SpotLight</div>
              <div class="viewer_menu_large_button viewer_add_ambientlight">add AmbientLight</div>
              </div>
              <div class="viewer_menu_ground viewer_menu_menu">
                  <div class="viewer_menu_large_button viewer_add_ground">add ground</div>
              </div>

          </div>

          <div class="viewer_model_editor_panel_holder">
              <div class="viewer_model_editor_panel_elements">
                  <div class="viewer_uni_gap"></div>
              </div>

              <div class="viewer_model_editor_panel_elements_settings_panel">
              </div>
          </div>


    <?php
}


function addAdminHTML(){
    global $wpdb;
    $tablename = $wpdb->prefix . 'three_viewer';
    $ourQuery = $wpdb->prepare("SELECT * FROM $tablename LIMIT 100");
    $viewers = $wpdb->get_results($ourQuery);


    ?>
    
    <!-- <h1>Hello 3d viewer</h1> -->
    
    <div class="editor_wrapper_viewer_tab">
        <div class="editor_single_tab" id="editor_single_tab_list" >List</div>
        <div class="editor_single_tab" id="editor_single_tab_add" >Add New</div>
        <div class="editor_single_tab" id="editor_single_tab_feature" >Maple Products</div>
        <div class="editor_single_tab" id="editor_single_tab_support" >Support</div>
    </div>

     <!-- list section -->
    <div class="editor_wrapper_viewer" id="editor_wrapper_list">
     <div class="viewerRegularBtc add_new_viewer_three">Add New</div>
        <?php 
            foreach($viewers as $viewer) {
                ?>
            <div class="row_editor_viewer">
               <p class="title_viewer"><?php echo esc_attr( $viewer -> title ) ?></p>
               <div class="inner_row_editor_viewer">
                   <input type="text" class="copy_viewer_code" value="<?php echo esc_attr($viewer -> shortcode) ?>">
                   <div class="copy_viewer_code_btc">Copy</div>
               </div>
               <div class="edit_viewer_code_btc" id="viewer_post_id<?php echo esc_attr($viewer -> id) ?>">Edit</div>
               <?php if (current_user_can('administrator')) { ?>
            <td style="text-align: center;">
            <form action="<?php echo esc_url(admin_url('admin-post.php')) ?>" method="POST" class="delete_viewer_post">
              <input type="hidden" name="action" value="deleteviewer">
              <input type="hidden" name="idtodelete" value="<?php echo esc_attr($viewer ->id); ?>">
              <button class="delete-pet-button">X</button>
            </form>
          </td>
          <?php } ?>
              </div>
                <?php
                }
        ?>
      
    </div>
    

      <!-- add new section -->

    <div class="editor_wrapper_viewer" id="editor_wrapper_add">
    <p class="viewer_label_large">Add New</p>
    <form id="add_new_viewer_form" method="POST">
          <p class="viewer_label">Title</p>
          <input type="text" name="new_viewer_title" id="new_viewer_title" class="widehigh" value="my title..">
          <p class="viewer_label" style="display:inline-block;margin-right:2%;">Model URL</p>
          <?php 

if( $image = wp_get_attachment_image_src( $image_id ) ) {

echo '<a href="#" class="viewer-rmv">Remove Model</a>';

} else {

echo '<a href="#" class="viewer-upl">Upload Model</a>
<a href="#" class="viewer-rmv" style="display:none">Remove image</a>';

} 
?>
          <input type="text" name="new_viewer_modelurl" id="new_viewer_modelurl" class="widehigh" value="my title..">
          <p class="viewer_label">Background Color</p>

          <div class="error_viewer_model_message">erro with rhurh u</div>

          <div class="viewer_color_holder">
              <div class="viewer_color_box viewer_color_box0" ></div>
              <div class="viewer_color_box viewer_color_box1" ></div>
              <div class="viewer_color_box viewer_color_box2" ></div>
              <div class="viewer_color_box viewer_color_box3" ></div>
              <div class="viewer_color_box viewer_color_box4" ></div>
              <div class="viewer_color_box viewer_color_box5" ></div>
              <div class="viewer_color_box viewer_color_box6" ></div>
              <div class="viewer_color_box viewer_color_box7" ></div>
              <div class="viewer_color_box viewer_color_box8" ></div>
              <div class="viewer_color_box viewer_color_box9" ></div>
              <div class="viewer_color_box viewer_color_box10" ></div>
              <div class="viewer_color_box viewer_color_box11" ></div>
              <div class="viewer_color_box viewer_color_box12" ></div>
              <div class="viewer_color_box viewer_color_box13" ></div>
              <div class="viewer_color_box viewer_color_box14" ></div>
              <input class="viewer_color_boxd" id="viewer_bg_color"type="color" name="viewer_bg_color" style="top:-5.5%;" value="#000" >

          </div>
          <input type="hidden" name="viewer_model_arr_details" id="viewer_model_arr_details">
          <p class="viewer_label">Model Preview</p>
          
       <?php miniEditor(); ?>
          <canvas class="canvasID">
             
          </canvas>



          <input type="submit" value="Submit" name="new_viewer_submit" id="new_viewer_submit">

      </form>



    </div>

     <!-- features section -->

    <div class="editor_wrapper_viewer" id="editor_wrapper_features">
        <p class="viewer_label" style="width:50%;font-size:1.5em !important;">
           MapleWP is a team dedicated to create easy to use and essential wordpress products,our main goal is to connect users/developers/designers with their clients
        </p>
        <a class="mapleLink" href="https://maple-wp.com" target="_blank">Learn more</a>
      <div class="feature_viewer_box feature_viewer_box0">
        <p>CustomBot</p>

         <div class="feature_box_row">
         <p>ChatBot Plugin</p>
         <a href="https://wordpress.org/plugins/custombot/" target="_blank" class="download_viewer_button">Download Free</a>
         </div>
      </div>  
      <div class="feature_viewer_box feature_viewer_box1">
        <p>Mail Lister</p>
         <div class="feature_box_row">
         <p>Newsletter Plugin</p>
         <a href="https://wordpress.org/plugins/maillister/" target="_blank" class="download_viewer_button">Download Free</a>
         </div>
      </div>  
      <div class="feature_viewer_box feature_viewer_box2">
        <p>Three Viewer</p>
         <div class="feature_box_row">
         <p>3D Viewer Plugin</p>
         <a href="" target="_blank" class="download_viewer_button">Download Free</a>
        </div>  
    </div>
        </div>
     <!-- support section -->

    <div class="editor_wrapper_viewer" id="editor_wrapper_support">
  
    <p class="viewer_label_large">Support</p>


     <form id="support_viewer_form" method="POST">
        <div class="row_support">
        <p class="viewer_support_label">Full Name</p>
        <input type="text" name="fullname_support_viewer" id="fullname_support_viewer" class="wide_viewer_input">
        <p class="viewer_support_label">Email</p>
         <input type="email" name="email_support_viewer" id="email_support_viewer" class="wide_viewer_input">
         <p class="viewer_support_label">Message Subject</p>
         <input type="text" name="subject_support_viewer" id="subject_support_viewer" class="wide_viewer_input">
        </div>
        <div class="row_support">
        <p class="viewer_support_labelR">Telephone</p>
        <input type="tel" name="telphone_support_viewer" id="telphone_support_viewer" class="wide_viewer_input input_left_viewer">
        <p class="viewer_support_labelR">Website</p>
        <input type="text" name="website_support_viewer" id="website_support_viewer" class="wide_viewer_input input_left_viewer" value="<?php echo esc_attr(site_url()) ?>" disabled>
        <p class="viewer_support_labelR">Plugin</p>
        <input type="text" name="plugin_support_viewer" id="plugin_support_viewer" class="wide_viewer_input input_left_viewer" value="Three Viewer 1.0.0"  disabled>
       </div>
       <p class="viewer_support_label">Message</p>
        <textarea name="msg_support_viewer" id="msg_support_viewer"></textarea>
        <input type="submit" value="Send to Support" id="submit_support_viewer" name="submit_support_viewer" >
     </form>

    </div>


    <div class="editor_wrapper_viewer" id="editor_wrapper_edit">
    <p class="viewer_label_large">Edit</p>

    <form id="add_new_viewer_form" method="POST">
        
        <input type="text" style="display:none;" value="" name="edit_viewer_id" id="edit_viewer_id">
     
          <p class="viewer_label">Title</p>
          <input type="text" name="edit_viewer_title" id="edit_viewer_title" class="widehigh" value="my title..">
          <p class="viewer_label">Model URL</p>
          <input type="text" name="edit_viewer_modelurl" id="edit_viewer_modelurl" class="widehigh" value="my title..">
          <p class="viewer_label">Background Color</p>

          <div class="error_viewer_model_message">erro with rhurh u</div>

          <div class="viewer_color_holder">
              <div class="viewer_color_boxs viewer_color_boxs0" ></div>
              <div class="viewer_color_boxs viewer_color_boxs1" ></div>
              <div class="viewer_color_boxs viewer_color_boxs2" ></div>
              <div class="viewer_color_boxs viewer_color_boxs3" ></div>
              <div class="viewer_color_boxs viewer_color_boxs4" ></div>
              <div class="viewer_color_boxs viewer_color_boxs5" ></div>
              <div class="viewer_color_boxs viewer_color_boxs6" ></div>
              <div class="viewer_color_boxs viewer_color_boxs7" ></div>
              <div class="viewer_color_boxs viewer_color_boxs8" ></div>
              <div class="viewer_color_boxs viewer_color_boxs9" ></div>
              <div class="viewer_color_boxs viewer_color_boxs10" ></div>
              <div class="viewer_color_boxs  viewer_color_boxs11" ></div>
              <div class="viewer_color_boxs viewer_color_boxs12" ></div>
              <div class="viewer_color_boxs viewer_color_boxs13" ></div>
              <div class="viewer_color_boxs viewer_color_boxs14" ></div>
              <input class="viewer_color_boxd" id="edit_viewer_bg_color" type="color" name="edit_viewer_bg_color" style="top:-5.5%;" value="#000" >


          <input type="submit" value="Submit" name="edit_viewer_submit" id="edit_viewer_submit">

      </form>
      

    </div>

    <?php
}





