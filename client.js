
document.addEventListener('DOMContentLoaded',()=>{
if( document.querySelector('.viewer_canvas') !== undefined || null){


const canvasID = document.querySelector('.viewer_canvas')

const modelUrl = canvasID.getAttribute('data-model')
const modelSetup = canvasID.getAttribute('data-code')

const bgWidth = canvasID.getAttribute('data-width')
const bgHeight = canvasID.getAttribute('data-height')

const bgColor = canvasID.getAttribute('data-bg')

const gltfLoad =  new GLTFLoader()
const fbxLoad =  new FBXLoader()
const scene = new THREE.Scene()

const texLoad = new THREE.TextureLoader()
let models = []


let _setups =modelSetup.split(',')

console.log(_setups)

setTimeout(() => {
  _setups.forEach(e=>{

    let tempArr = e.split('&')
    addSceneDetails(tempArr) 
   
  
  
  
      
  })


}, 1500);



let geometry = new THREE.PlaneGeometry( 10, 10 );
let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
let plane = new THREE.Mesh( geometry, material );


function addSceneDetails(arr){
  if(arr[0].includes('Ground'))
  {
 



    let pos ={
      x:0,
      y:0,
      z:0

    }
   let rotate = {
    x:0,
    y:0,
    z:0
   }
   
   let scale = {
    x:1,
    y:1,
    z:1
   }

   plane.receiveShadow = true;

   scene.add(plane)

 


   if(arr[2].replaceAll('posX:','').includes('.')) pos.x = parseFloat(arr[2].replaceAll('posX:',''));
   else pos.x = parseInt(arr[2].replaceAll('posX:',''));
   if(arr[3].replaceAll('posY:','').includes('.')) pos.y = parseFloat(arr[3].replaceAll('posY:',''));
   else pos.y = parseInt(arr[3].replaceAll('posY:',''));
   if(arr[4].replaceAll('posZ:','').includes('.')) pos.z = parseFloat(arr[4].replaceAll('posZ:',''));
   else pos.z = parseInt(arr[4].replaceAll('posZ:',''));

   if(arr[5].replaceAll('rotX:','').includes('.')) rotate.x = parseFloat(arr[5].replaceAll('rotX:',''));
   else rotate.x = parseInt(arr[5].replaceAll('rotX:',''));
   if(arr[6].replaceAll('rotY:','').includes('.')) rotate.y = parseFloat(arr[6].replaceAll('rotY:',''));
   else rotate.y = parseInt(arr[6].replaceAll('rotY:',''));
   if(arr[7].replaceAll('rotZ:','').includes('.')) rotate.z = parseFloat(arr[7].replaceAll('rotZ:',''));
   else rotate.z = parseInt(arr[7].replaceAll('rotZ:',''));


   if(arr[8].replaceAll('scX:','').includes('.')) scale.x = parseFloat(arr[8].replaceAll('scX:',''));
   else scale.x = parseInt(arr[8].replaceAll('scX:',''));
   if(arr[9].replaceAll('scY:','').includes('.')) scale.y = parseFloat(arr[9].replaceAll('scY:',''));
   else scale.y = parseInt(arr[9].replaceAll('scY:',''));
   if(arr[10].replaceAll('scZ:','').includes('.')) scale.z = parseFloat(arr[10].replaceAll('scZ:',''));
   else scale.z = parseInt(arr[10].replaceAll('scZ:',''));
   
 
        
      if(pos.x !== NaN) plane.position.x = pos.x
      if(pos.y !== NaN) plane.position.y = pos.y
      if(pos.z !== NaN) plane.position.z = pos.z
  
      if(rotate.z !== NaN) plane.rotation.z = rotate.z
      if(rotate.x !== NaN) plane.rotation.x = rotate.x
      if(rotate.y !== NaN) plane.rotation.y = rotate.y
       

       
      if(isNaN(scale.x) || scale.x === 0) 
      {
        plane.scale.x = 1
      }
      else {
        plane.scale.x = scale.x
      }
      if(isNaN(scale.y) || scale.y === 0) {
        plane.scale.y = 1
      }
      else {
        plane.scale.y = scale.y
      }
      if(isNaN(scale.z) || scale.z === 0) {
        plane.scale.z = 1
      }
      else {
        plane.scale.z = scale.z
      }
      plane.material.color = new THREE.Color(arr[11].replaceAll('color:',''))
      scene.add(plane)
  


  }

  if(arr[0].includes('Model'))
  {
  

    let pos ={
      x:0,
      y:0,
      z:0

    }
   let rotate = {
    x:0,
    y:0,
    z:0
   }
   
   let scale = {
    x:0,
    y:0,
    z:0
   }




   if(arr[2].replaceAll('posX:','').includes('.')) pos.x = parseFloat(arr[2].replaceAll('posX:',''))
   else pos.x = parseInt(arr[2].replaceAll('posX:',''))
   if(arr[3].replaceAll('posY:','').includes('.')) pos.y = parseFloat(arr[3].replaceAll('posY:',''))
   else pos.y = parseInt(arr[3].replaceAll('posY:',''))
   if(arr[4].replaceAll('posZ:','').includes('.')) pos.z = parseFloat(arr[4].replaceAll('posZ:',''))
   else pos.z = parseInt(arr[4].replaceAll('posZ:',''))

   if(arr[5].replaceAll('rotX:','').includes('.')) rotate.x = parseFloat(arr[5].replaceAll('rotX:',''))
   else rotate.x = parseInt(arr[5].replaceAll('rotX:',''))
   if(arr[6].replaceAll('rotY:','').includes('.')) rotate.y = parseFloat(arr[6].replaceAll('rotY:',''))
   else rotate.y = parseInt(arr[6].replaceAll('rotY:',''))
   if(arr[7].replaceAll('rotZ:','').includes('.')) rotate.z = parseFloat(arr[7].replaceAll('rotZ:',''))
   else rotate.z = parseInt(arr[7].replaceAll('rotZ:',''))


   if(arr[8].replaceAll('scX:','').includes('.')) scale.x = parseFloat(arr[8].replaceAll('scX:',''))
   else scale.x = parseInt(arr[8].replaceAll('scX:',''))
   if(arr[9].replaceAll('scY:','').includes('.')) scale.y = parseFloat(arr[9].replaceAll('scY:',''))
   else scale.y = parseInt(arr[9].replaceAll('scY:',''))
   if(arr[10].replaceAll('scZ:','').includes('.')) scale.z = parseFloat(arr[10].replaceAll('scZ:',''))
   else scale.z = parseInt(arr[10].replaceAll('scZ:',''))
   
  
      
      models[0].position.x = pos.x
      models[0].position.y = pos.y
      models[0].position.z = pos.z
  
      models[0].rotation.x = rotate.x
      models[0].rotation.y = rotate.y
      models[0].rotation.z= rotate.z
    
  
      if(scale.x === 0)models[0].scale.x = 1
      else models[0].scale.x = scale.x
      if(scale.y === 0)models[0].scale.y = 1
      else models[0].scale.y = scale.y
      if(scale.z === 0)models[0].scale.z = 1
      else models[0].scale.z = scale.z



  }

  if(arr[0].includes('Light'))
  {
   if(arr[0].includes('PointLight')){

    let pos ={
      x:0,
      y:0,
      z:0

    }
   let _pow = 1

    if(arr[2].replaceAll('posX:','').includes('.')) pos.x = parseFloat(arr[2].replaceAll('posX:',''))
    else pos.x = parseInt(arr[2].replaceAll('posX:',''))
    if(arr[3].replaceAll('posY:','').includes('.')) pos.y = parseFloat(arr[3].replaceAll('posY:',''))
    else pos.y = parseInt(arr[3].replaceAll('posY:',''))
    if(arr[4].replaceAll('posZ:','').includes('.')) pos.z = parseFloat(arr[4].replaceAll('posZ:',''))
    else pos.z = parseInt(arr[4].replaceAll('posZ:',''))
    if(arr[5].replaceAll('power:','').includes('.')) _pow = parseFloat(arr[5].replaceAll('power:',''))
    else _pow = parseInt(arr[5].replaceAll('power:',''))
          
 
      
    let light = new THREE.PointLight( 0xff0000);
    light.castShadow = true;
    light.position.x = pos.x
    light.position.y = pos.y
    light.position.z = pos.z
    light.intensity = _pow
    let color = arr[6].replaceAll('color:','')
    light.color = new THREE.Color(color)

    scene.add(light)


   }
   if(arr[0].includes('SpotLight')){

    let pos ={
      x:0,
      y:0,
      z:0

    }
   let _pow = 1

    if(arr[2].replaceAll('posX:','').includes('.')) pos.x = parseFloat(arr[2].replaceAll('posX:',''))
    else pos.x = parseInt(arr[2].replaceAll('posX:',''))
    if(arr[3].replaceAll('posY:','').includes('.')) pos.y = parseFloat(arr[3].replaceAll('posY:',''))
    else pos.y = parseInt(arr[3].replaceAll('posY:',''))
    if(arr[4].replaceAll('posZ:','').includes('.')) pos.z = parseFloat(arr[4].replaceAll('posZ:',''))
    else pos.z = parseInt(arr[4].replaceAll('posZ:',''))
    if(arr[5].replaceAll('power:','').includes('.')) _pow = parseFloat(arr[5].replaceAll('power:',''))
    else _pow = parseInt(arr[5].replaceAll('power:',''))
          
 
      
    let light = new THREE.SpotLight( 0xff0000);
    light.receiveShadow = true
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.castShadow = true;
    light.position.x = pos.x
    light.position.y = pos.y
    light.position.z = pos.z
    light.intensity = _pow
    let color = arr[6].replaceAll('color:','')
    light.color = new THREE.Color(color)

    scene.add(light)

   }
   if(arr[0].includes('AmbientLight')){

    let pos ={
      x:0,
      y:0,
      z:0

    }
   let _pow = 1

    if(arr[2].replaceAll('posX:','').includes('.')) pos.x = parseFloat(arr[2].replaceAll('posX:',''))
    else pos.x = parseInt(arr[2].replaceAll('posX:',''))
    if(arr[3].replaceAll('posY:','').includes('.')) pos.y = parseFloat(arr[3].replaceAll('posY:',''))
    else pos.y = parseInt(arr[3].replaceAll('posY:',''))
    if(arr[4].replaceAll('posZ:','').includes('.')) pos.z = parseFloat(arr[4].replaceAll('posZ:',''))
    else pos.z = parseInt(arr[4].replaceAll('posZ:',''))
    if(arr[5].replaceAll('power:','').includes('.')) _pow = parseFloat(arr[5].replaceAll('power:',''))
    else _pow = parseInt(arr[5].replaceAll('power:',''))
          
 
      
    let light = new THREE.AmbientLight( 0xff0000);
    light.receiveShadow = true
    light.castShadow = true;
    light.position.x = pos.x
    light.position.y = pos.y
    light.position.z = pos.z
    light.intensity = _pow
    let color = arr[6].replaceAll('color:','')
    light.color = new THREE.Color(color)

    scene.add(light)

   }
   if(arr[0].includes('DirectionalLight')){

    let pos ={
      x:0,
      y:0,
      z:0

    }
   let _pow = 1

    if(arr[2].replaceAll('posX:','').includes('.')) pos.x = parseFloat(arr[2].replaceAll('posX:',''))
    else pos.x = parseInt(arr[2].replaceAll('posX:',''))
    if(arr[3].replaceAll('posY:','').includes('.')) pos.y = parseFloat(arr[3].replaceAll('posY:',''))
    else pos.y = parseInt(arr[3].replaceAll('posY:',''))
    if(arr[4].replaceAll('posZ:','').includes('.')) pos.z = parseFloat(arr[4].replaceAll('posZ:',''))
    else pos.z = parseInt(arr[4].replaceAll('posZ:',''))
    if(arr[5].replaceAll('power:','').includes('.')) _pow = parseFloat(arr[5].replaceAll('power:',''))
    else _pow = parseInt(arr[5].replaceAll('power:',''))
          
 
      
    let light = new THREE.DirectionalLight( 0xff0000);
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
     light.receiveShadow = true
    light.castShadow = true;
    light.position.x = pos.x
    light.position.y = pos.y
    light.position.z = pos.z
    light.intensity = _pow
    let color = arr[6].replaceAll('color:','')
    light.color = new THREE.Color(color)

    scene.add(light)

   }
  }
}
















renderer = new THREE.WebGLRenderer({canvas: canvasID ,antialias: true,alpha:true
})

const sizes = {
  width: 1000,
  height: 750


}




if(bgWidth !== undefined || null) sizes.width = bgWidth
if(bgWidth == 'full') sizes.width = window.innerWidth

if(bgHeight !== undefined || null) sizes.height = bgHeight
if(bgHeight == 'full') sizes.height = window.innerHeight

renderer.setSize(sizes.width,sizes.height)
//set background color
renderer.setClearColor( bgColor,1 );

// screen size

// Resize function



const aspectRatio = sizes.width/sizes.height
// camera
const camera = new THREE.PerspectiveCamera(75,aspectRatio,1,1000)

// camera.position.z =5
// camera.position.y = 1
scene.add(camera)


function addGltf(url){
    gltfLoad.load(url,(gltf) =>{
        gltf.scene.scale.x = 1
        gltf.scene.scale.y = 1
        gltf.scene.scale.z = 1
        models.push(gltf.scene)
        scene.add(gltf.scene)

    })
}

function addFbx(url){
    fbxLoad.load(url,(fbx) =>{
       fbx.scale.x = 1
       fbx.scale.y = 1
       fbx.scale.z = 1
        scene.add(fbx)
        models.push(fbx)

    })
}




if(modelUrl.includes('gltf') ||modelUrl.includes('glb'))
{

addGltf(modelUrl)


}
else if(modelUrl.includes('fbx')){
    addFbx(modelUrl)

}


let disableWheel = true

	
const controls = new THREE.OrbitControls(
    camera, canvasID);
    controls.enableDamping = true

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


//render animation
function anim(){
  // time of clock
    requestAnimationFrame(anim)
    renderer.render(scene,camera)
    const elpasedTime = clock.getElapsedTime()




}

anim()



}

})