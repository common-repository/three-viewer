

// import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.114/examples/jsm/controls/OrbitControls.js';


let scene = new THREE.Scene()

let _allEditorElm = []
let currentId = 0
		
let models = [] 
let canAddModel = false
function addModel(){
  
   _allEditorElm.forEach(e=>{
	   if(e.type === 'Model') canAddModel = true
	   
   })

   if(canAddModel === false && models.length === 1){
	   
let modelDetails = {
	type:'Model',
	pos:{
		x:0,
		y:0,
		z:0
	},
	rotate:{
		x:0,
		y:0,
		z:0
	},
	scale:{
		x:0,
		y:0,
		z:0
	},
	object:models[0].scene
}
_allEditorElm.push(modelDetails)
  createElementPanel(modelDetails.type,_allEditorElm.length-1,modelDetails.object)

   }

}

function __addPointLight(){
	let light = new THREE.PointLight( 0xff0000);
	light.castShadow = true;
	let lightDetails = {
		type:'PointLight',
		pos:{
			x:0,
			y:0,
			z:0
		},
		color:'#ff0000',
		power:1,
		object:light
	}
	_allEditorElm.push(lightDetails)
	scene.add( light );
	
	createElementPanel(lightDetails.type,_allEditorElm.length-1,lightDetails.object)

}

function __addSpotLight(){
	let light = new THREE.SpotLight( 0xff0000);
	light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
	light.castShadow = true;

	light.castShadow = true;
	let lightDetails = {
		type:'SpotLight',
		pos:{
			x:0,
			y:0,
			z:0
		},
		color:'#ff0000',
		power:1,
		object:light
	}
	_allEditorElm.push(lightDetails)
	scene.add( light );
	
	createElementPanel(lightDetails.type,_allEditorElm.length-1,lightDetails.object)

}

function __addAmbientLight(){
	let light = new THREE.AmbientLight( 0xff0000);

	light.castShadow = true;
	let lightDetails = {
		type:'AmbientLight',
		pos:{
			x:0,
			y:0,
			z:0
		},
		color:'#ff0000',
		power:1,
		object:light
	}
	_allEditorElm.push(lightDetails)
	scene.add( light );
	
	createElementPanel(lightDetails.type,_allEditorElm.length-1,lightDetails.object)

}

function __addDirectLight(){
	let light = new THREE.DirectionalLight( 0xff0000);
	light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
	light.castShadow = true;

	light.castShadow = true;
	let lightDetails = {
		type:'DirectionalLight',
		pos:{
			x:0,
			y:0,
			z:0
		},
		color:'#ff0000',
		power:1,
		object:light
	}
	_allEditorElm.push(lightDetails)
	scene.add( light );
	
	createElementPanel(lightDetails.type,_allEditorElm.length-1,lightDetails.object)

}

function addGround(){

const geometry = new THREE.PlaneGeometry( 10, 10 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.receiveShadow = true;

let groundDetails = {
	type:'Ground',
	pos:{
		x:0,
		y:0,
		z:0
	},
	rotate:{
		x:0,
		y:0,
		z:0
	},
	scale:{
		x:0,
		y:0,
		z:0
	},
	color:'#ff0000',
	object:plane
}
_allEditorElm.push(groundDetails)
  scene.add( plane );
  createElementPanel(groundDetails.type,_allEditorElm.length-1,groundDetails.object)

}




function removeElem(id){
	if(_allEditorElm[id] !== undefined ){
		scene.remove(_allEditorElm[id].object)
		_allEditorElm.splice(id,1)
	}
}
	
let _script = []

document.addEventListener('DOMContentLoaded',()=>{

	document.querySelector('#new_viewer_submit').addEventListener('click',()=>{

		_allEditorElm.forEach((a,i)=>{
	
				if(a.type.includes('Light')){
					let first = 'type:'+a.type
					let second = 'id:'+i
					let three = 'posX:'+a.pos.x
					let four = 'posY:'+a.pos.y
					let five = 'posZ:'+a.pos.z
					let six = 'power:'+a.power
					let seven = 'color:'+a.color 
					let lop = first.concat('&',second,'&',three,'&',four,'&',five,'&',six,'&',seven)
					_script.push(lop)
				}
				else if(a.type.includes('Model')){
					let first = 'type:'+a.type
					let second = 'id:'+i
					let three = 'posX:'+a.pos.x
					let four = 'posY:'+a.pos.y
					let five = 'posZ:'+a.pos.z
					let six = 'rotX:'+a.rotate.x
					let seven = 'rotY:'+a.rotate.y
					let eight = 'rotZ:'+a.rotate.z
					let nine = 'scX:'+a.scale.x
					let ten = 'scY:'+a.scale.y
					let eleven = 'scZ:'+a.scale.z
					let lop = first.concat('&',second,'&',three,'&',four,'&',five,'&',six,'&',seven,'&',eight,'&',nine,'&',ten,'&',eleven)
					_script.push(lop)
				}
				else if(a.type.includes('Ground')){
					let first = 'type:'+a.type
					let second = 'id:'+i
					let three = 'posX:'+a.pos.x
					let four = 'posY:'+a.pos.y
					let five = 'posZ:'+a.pos.z
					let six = 'rotX:'+a.rotate.x
					let seven = 'rotY:'+a.rotate.y
					let eight = 'rotZ:'+a.rotate.z
					let nine = 'scX:'+a.scale.x
					let ten = 'scY:'+a.scale.y
					let eleven = 'scZ:'+a.scale.z
					let twelve = 'color:'+a.color 
					let lop = first.concat('&',second,'&',three,'&',four,'&',five,'&',six,'&',seven,'&',eight,'&',nine,'&',ten,'&',eleven,'&',twelve)
					_script.push(lop)
				}
				

			
		
		})
		document.querySelector('#viewer_model_arr_details').value = _script


	

	})

	

	let renderer
	let gltfLoad =  new GLTFLoader()
	let fbxLoad =  new FBXLoader()
	
	let texLoad = new THREE.TextureLoader()
	let click = false
	
	let gui = new dat.GUI()
	
	function threeFrontEnd(){
		let attachment,_modelUrlInput
	
		_modelUrlInput = document.querySelector('#new_viewer_modelurl')

	
		const canvasID = document.querySelector('.canvasID')
		
	
	
		
	


		function addGltf(url){
			gltfLoad.load(url,(gltf) =>{
				gltf.scene.scale.x = 1
				gltf.scene.scale.y = 1
				gltf.scene.scale.z = 1
				models.push(gltf)
				scene.add(gltf.scene)
			})
		}

		function addFbx(url){
			fbxLoad.load(url,(fbx) =>{
			   fbx.scale.x = 1
			   fbx.scale.y = 1
			   fbx.scale.z = 1
				models.push(fbx)
				scene.add(fbx)
				
			},(error)=>{
				let msg =document.querySelector('.error_viewer_model_message')
				msg.innerHTML = 'We have a problem with your model, try other one'
                msg.style.display = 'block'
				msg.style.opacity = 1
				setTimeout(() => {
					msg.style.opacity = 0
                   setTimeout(() => {
					msg.style.display = 'none'
				   }, 500);
				}, 2500);
				
				
			})
		}
	
		_modelUrlInput.addEventListener('input',()=>{
			if(_modelUrlInput.value.includes('gltf') || _modelUrlInput.value.includes('glb'))
			{
			
				 addGltf(_modelUrlInput.value)
			
			
			}
			else if(_modelUrlInput.value.includes('fbx')){
			    addFbx(_modelUrlInput.value)
			}
		})
		

		// renderer
		 renderer = new THREE.WebGLRenderer({canvas: canvasID ,antialias: true,alpha:true
		})
		renderer.setSize(700,450)
		//set background color
		renderer.setClearColor( '#fff',1 );
		
		// screen size
		const sizes = {
		  width: 700,
		  height: 450
		}
		// Resize function
	
		
		
		
		const aspectRatio = sizes.width/sizes.height
		// camera
		const camera = new THREE.PerspectiveCamera(75,aspectRatio,1,1000)
		
		
		camera.position.z =0
		camera.position.y = 0
		scene.add(camera)
		
		
		
		
		canvasID.addEventListener('click', event => {
			event.stopPropagation();
		  
			// handle event
		  });
	
	let disableWheel = true
		const controls = new THREE.OrbitControls(
			camera, canvasID);
			controls.enableDamping = true
			controls.autoRotate = true


			controls.addEventListener( 'change',()=>{

				disableWheel = false
			  })
		  
			  window.addEventListener('wheel', function(event)
			  {
				if(disableWheel === true){
				  if (event.deltaY < 0)
				  {
				   console.log('scrolling up');
				   camera.position.z += 1
				  
				  }
				  else if (event.deltaY > 0)
				  {
				   console.log('scrolling down');
				   camera.position.z -= 1
				  }
				}
			  });
	

		  const clock = new THREE.Clock()



          let canvasBound = canvasID.getBoundingClientRect()
		 
		  document.querySelector('.viewer_model_editor_holder').style.width = `${sizes.width}px`
		  document.querySelector('.viewer_model_editor_panel_holder').style.width = `${sizes.width/2.5}px`
		  document.querySelector('.viewer_model_editor_panel_holder').style.height = `${sizes.height}px`

		
		//render animation
		function anim(){
		  // time of clock
			requestAnimationFrame(anim)
			renderer.render(scene,camera)
			const elpasedTime = clock.getElapsedTime()

		
		
		
		}
		
		anim()
	
	
	
	

	
	
	
	
	
	
	
	
	
	jQuery(function($){
	
		// on upload button click
		$('body').on( 'click', '.viewer-upl', function(e){
	
			e.preventDefault();
	
			var button = $(this),
			custom_uploader = wp.media({
				title: 'Insert image',
				library : {
					// uploadedTo : wp.media.view.settings.post.id, // attach to the current post?
					type : 'application/octet-stream'
				},
				button: {
					text: 'Use this image' // button label text
				},
				multiple: false
			}).on('select', function() { // it also has "open" and "close" events
				attachment = custom_uploader.state().get('selection').first().toJSON();
	
				document.querySelector('#new_viewer_modelurl').value = attachment.url
	
				if(attachment.url.includes('gltf') || _modelUrlInput.value.includes('glb'))
				{
			
			    addGltf(attachment.url)
				
				
				}
				else if(attachment.url.includes('fbx')){
					addFbx(attachment.url)

				}
		
			}).open();
		
		});
	
		// on remove button click
		$('body').on('click', '.viewer-rmv', function(e){
	
			e.preventDefault();
	
			var button = $(this);
			button.next().val(''); // emptying the hidden field
			button.hide().prev().html('Upload Model');
		});
	
	});
	}

	threeFrontEnd()


	const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`


	const _listTabBtc = document.querySelector('#editor_single_tab_list');
	const _addTabBtc = document.querySelector('#editor_single_tab_add');
	const _featuresTabBtc = document.querySelector('#editor_single_tab_feature');
	const _supportTabBtc = document.querySelector('#editor_single_tab_support');
	let _editButton = document.querySelectorAll('.edit_viewer_code_btc')
	let allCopyInputs = document.querySelectorAll('.copy_viewer_code')
	let allCopyBtc = document.querySelectorAll('.copy_viewer_code_btc')

	const allProductsBoxs = document.querySelectorAll('.feature_viewer_box')
	const allProductsBoxsLinks = document.querySelectorAll('.download_viewer_button')

	const _listWrapper = document.querySelector('#editor_wrapper_list');
	const _addWrapper = document.querySelector('#editor_wrapper_add');
	const _featurestWrapper = document.querySelector('#editor_wrapper_features');
	const _supportWrapper = document.querySelector('#editor_wrapper_support');
	const _editWrapper = document.querySelector('#editor_wrapper_edit')

	const _anotherAddTabBtc = document.querySelector('.add_new_viewer_three');

    let _locStorageList = localStorage.getItem('listClicked')
    let _locStorageAdd = localStorage.getItem('addClicked')
    let _locStorageFeatures = localStorage.getItem('featuresClicked')
    let _locStorageSupport = localStorage.getItem('supportClicked')

	let colorViewerInput = document.querySelector('#viewer_bg_color')
	let colorViewerEditInput = document.querySelector('#edit_viewer_bg_color')
	let colorBoxs = document.querySelectorAll('.viewer_color_box')
	let colorBoxs0 = document.querySelectorAll('.viewer_color_boxs')


   
    allProductsBoxs.forEach((box,i)=>{
		box.addEventListener('mouseover',()=>{
			allProductsBoxsLinks[i].style.opacity= 1
		})
		box.addEventListener('mouseout',()=>{
			allProductsBoxsLinks[i].style.opacity= 0
		})
	})

    allCopyBtc.forEach((b,i) => {
		b.addEventListener('click',()=>{
			var copyText = allCopyInputs[i];

			/* Select the text field */
			copyText.select();
			copyText.setSelectionRange(0, 99999); /* For mobile devices */
		  
			 /* Copy the text inside the text field */
			navigator.clipboard.writeText(copyText.value);
		  
			
		})
		
	});

	_editButton.forEach((b,i)=>{
		b.addEventListener('click',()=>{
		 _listWrapper.style.display = 'none'
		 _editWrapper.style.display = 'block'
		 let num =  b.getAttribute('id').replaceAll('viewer_post_id','')
		 document.querySelector('#edit_viewer_id').value = num
		 document.querySelector('#edit_viewer_title').value = allTitles[i]
		 document.querySelector('#edit_viewer_modelurl').value = allModels[i]

		
	})
   })

    colorViewerInput.addEventListener('change',()=>{
		renderer.setClearColor( colorViewerInput.value,1 );

	})
 
	colorBoxs.forEach(c=>{
		   c.addEventListener('click',()=>{
         let hexVal = rgb2hex(window.getComputedStyle(c).backgroundColor)
         colorViewerInput.value =  hexVal
		 renderer.setClearColor( hexVal,1 )

     })
	})

 
	colorBoxs0.forEach(c=>{
		c.addEventListener('click',()=>{
	  let hexVal = rgb2hex(window.getComputedStyle(c).backgroundColor)
	  colorViewerEditInput.value =  hexVal

  })
 })
   
	if(_locStorageList == 'true') 
	{
		TabClicked(_listWrapper,_listTabBtc)
		TabRelease(_addWrapper,_addTabBtc)
		TabRelease(_featurestWrapper,_featuresTabBtc)
		TabRelease(_supportWrapper,_supportTabBtc)
 
		localStorage.setItem('listClicked','true')
		localStorage.setItem('addClicked','false')
		localStorage.setItem('featuresClicked','false')
		localStorage.setItem('supportClicked','false')
	}
	if(_locStorageAdd == 'true') 
	{
		TabRelease(_listWrapper,_listTabBtc)
		TabClicked(_addWrapper,_addTabBtc)
		TabRelease(_featurestWrapper,_featuresTabBtc)
		TabRelease(_supportWrapper,_supportTabBtc)
		localStorage.setItem('listClicked','false')
		localStorage.setItem('addClicked','true')
		localStorage.setItem('featuresClicked','false')
		localStorage.setItem('supportClicked','false')
	}
	if(_locStorageFeatures == 'true')
	{
		TabRelease(_listWrapper,_listTabBtc)
		TabRelease(_addWrapper,_addTabBtc)
		TabClicked(_featurestWrapper,_featuresTabBtc)
		TabRelease(_supportWrapper,_supportTabBtc)
		localStorage.setItem('listClicked','false')
		localStorage.setItem('addClicked','false')
		localStorage.setItem('featuresClicked','true')
		localStorage.setItem('supportClicked','false')
	}
   if(_locStorageSupport == 'true') 
	{
		TabRelease(_listWrapper,_listTabBtc)
		TabRelease(_addWrapper,_addTabBtc)
		TabRelease(_featurestWrapper,_featuresTabBtc)
		TabClicked(_supportWrapper,_supportTabBtc)
		localStorage.setItem('listClicked','false')
		localStorage.setItem('addClicked','false')
		localStorage.setItem('featuresClicked','false')
		localStorage.setItem('supportClicked','true')
	}
		


	_listTabBtc.addEventListener('click',()=>{
		_editWrapper.style.display ='none'
       TabClicked(_listWrapper,_listTabBtc)
	   TabRelease(_addWrapper,_addTabBtc)
	   TabRelease(_featurestWrapper,_featuresTabBtc)
	   TabRelease(_supportWrapper,_supportTabBtc)

	   localStorage.setItem('listClicked','true')
	   localStorage.setItem('addClicked','false')
	   localStorage.setItem('featuresClicked','false')
	   localStorage.setItem('supportClicked','false')

	   
     
	})
	
	_addTabBtc.addEventListener('click',()=>{
		_editWrapper.style.display ='none'
		TabRelease(_listWrapper,_listTabBtc)
		TabClicked(_addWrapper,_addTabBtc)
		TabRelease(_featurestWrapper,_featuresTabBtc)
		TabRelease(_supportWrapper,_supportTabBtc)

		localStorage.setItem('listClicked','false')
		localStorage.setItem('addClicked','true')
		localStorage.setItem('featuresClicked','false')
		localStorage.setItem('supportClicked','false')
	 })

	 _anotherAddTabBtc.addEventListener('click',()=>{
	    _editWrapper.style.display ='none'
		TabRelease(_listWrapper,_listTabBtc)
		TabClicked(_addWrapper,_addTabBtc)
		TabRelease(_featurestWrapper,_featuresTabBtc)
		TabRelease(_supportWrapper,_supportTabBtc)

		localStorage.setItem('listClicked','false')
		localStorage.setItem('addClicked','true')
		localStorage.setItem('featuresClicked','false')
		localStorage.setItem('supportClicked','false')
	 })

	 _featuresTabBtc.addEventListener('click',()=>{
	    _editWrapper.style.display ='none'
		TabRelease(_listWrapper,_listTabBtc)
		TabRelease(_addWrapper,_addTabBtc)
		TabClicked(_featurestWrapper,_featuresTabBtc)
		TabRelease(_supportWrapper,_supportTabBtc)
		localStorage.setItem('listClicked','false')
		localStorage.setItem('addClicked','false')
		localStorage.setItem('featuresClicked','true')
		localStorage.setItem('supportClicked','false')
	 })
	 _supportTabBtc.addEventListener('click',()=>{
		 console.log(_supportWrapper)
	    _editWrapper.style.display ='none'
		TabRelease(_listWrapper,_listTabBtc)
		TabRelease(_addWrapper,_addTabBtc)
		TabRelease(_featurestWrapper,_featuresTabBtc)
		TabClicked(_supportWrapper,_supportTabBtc)
		localStorage.setItem('listClicked','false')
		localStorage.setItem('addClicked','false')
		localStorage.setItem('featuresClicked','false')
		localStorage.setItem('supportClicked','true')
	 })
      


	 document.querySelector('#submit_support_viewer').addEventListener('click',()=>{
		 document.querySelector('#website_support_viewer').disabled = false
		 document.querySelector('#plugin_support_viewer').disabled = false

	 })

	function TabClicked(tab,btc){
		btc.setAttribute('class','editor_single_tab_hoverd')
		tab.style.display = 'block'
	}
    function TabRelease(tab,btc){
		btc.setAttribute('class','editor_single_tab')
		tab.style.display = 'none'
	}




})



