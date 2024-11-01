

function initMiniEditor(){
  

const _OpenPanelButton = document.querySelector('.tabopen');
const _LightsButton = document.querySelector('.tablight');
const _GroundButton = document.querySelector('.tabground');
const _ModelButton = document.querySelector('.tabmodel');

const _lightsMenuHolder = document.querySelector('.viewer_menu_lights')
const _groundMenuHolder = document.querySelector('.viewer_menu_ground')

const addPointLight = document.querySelector('.viewer_add_pointlight')
const addDirectLight = document.querySelector('.viewer_add_directlight')
const addSpotLight = document.querySelector('.viewer_add_spotlight')
const addAmbientLight = document.querySelector('.viewer_add_ambientlight')
const addGroundPlane = document.querySelector('.viewer_add_ground')


const _elementsPanel = document.querySelector('.viewer_model_editor_panel_elements')

const _Panel = document.querySelector('.viewer_model_editor_panel_holder')
const _menu = document.querySelector('.viewer_model_editor_menu')





let _OpenPanelButtonClicked = true


_OpenPanelButton.addEventListener('click',()=>{
    _menu.style.display = 'none'

    
  if(_OpenPanelButtonClicked === false){
      _OpenPanelButtonClicked = true
      _OpenPanelButton.innerHTML = 'close panel'
      _Panel.style.display = 'block'

  }
  else{
      _OpenPanelButtonClicked = false
      _OpenPanelButton.innerHTML = 'open panel'
      _Panel.style.display = 'none'

  }

})

_LightsButton.addEventListener('click',()=>{
    _menu.style.left = `${_LightsButton.getBoundingClientRect().x/2.75}px`
    _menu.style.display = 'block'
    _lightsMenuHolder.style.display = 'block'
    _groundMenuHolder.style.display = 'none'
})

_GroundButton.addEventListener('click',()=>{
    _menu.style.left = `${_GroundButton.getBoundingClientRect().x/2.75}px`
    _menu.style.display = 'block'
    _lightsMenuHolder.style.display = 'none'
    _groundMenuHolder.style.display = 'block'
    
})
_ModelButton.addEventListener('click',()=>{
  _menu.style.display = 'none'
  addModel()
})


addPointLight.addEventListener('click',()=>{
  __addPointLight()
    _menu.style.display = 'none'
})
addSpotLight.addEventListener('click',()=>{
    __addSpotLight()
      _menu.style.display = 'none'
})
addAmbientLight.addEventListener('click',()=>{
    __addAmbientLight()
      _menu.style.display = 'none'
})
addDirectLight.addEventListener('click',()=>{
    __addDirectLight()
      _menu.style.display = 'none'
})

addGroundPlane.addEventListener('click',()=>{
    addGround()
    _menu.style.display = 'none'
})






}


function createElementPanel(name,id,obj){

 

    let divHolder = document.createElement('div')
    divHolder.addEventListener('click',()=>{
       createObjPanel(obj,id)
    })
    divHolder.setAttribute('class','viewer_details_holder')
    divHolder.setAttribute('id',`viewerElementSrc${id}`)

    let deleteButton = document.createElement('div')
    deleteButton.setAttribute('class','delete_viewer_element')
    let deleteButtonText = document.createTextNode('x')
    deleteButton.appendChild(deleteButtonText)
    

    deleteButton.addEventListener('click',()=>{
        if(name === 'Model' ) canAddModel = false
        removeElem(id)
        document.querySelector('.viewer_model_editor_panel_elements').removeChild(divHolder)
        removeAllChildNodes(document.querySelector('.viewer_model_editor_panel_elements_settings_panel'))
        
    })

    let title = document.createElement('p')
    title.setAttribute('class','viewer_title_element')
    let titleText = document.createTextNode(name)
    title.appendChild(titleText)

    divHolder.appendChild(title)
    divHolder.appendChild(deleteButton)

   document.querySelector('.viewer_model_editor_panel_elements').appendChild(divHolder)
}

function createObjPanel(object,id){
    if(object.type.includes('Light')){


    let divWrapper = document.createElement('div')
    divWrapper.setAttribute('class','viewer_element_setting_div')

    let divRow = document.createElement('div')
    divRow.setAttribute('class','viewer_element_setting_div_row')

    
    let inputTextPosX = document.createElement('input')
    inputTextPosX.type = 'text'
    inputTextPosX.setAttribute('class','sideInput')
    let inputPosX = document.createElement('input')
    inputPosX.type = 'range'
    inputPosX.max = 200
    inputPosX.step = 0.01
    inputPosX.min = -200
    inputPosX.value = _allEditorElm[id].pos.x
    inputPosX.addEventListener('input',()=>{
       _allEditorElm[id].object.position.x = inputPosX.value
       _allEditorElm[id].pos.x = inputPosX.value

    })
    inputTextPosX.addEventListener('input',()=>{
        _allEditorElm[id].object.position.x = inputTextPosX.value
        _allEditorElm[id].pos.x = inputTextPosX.value
        inputPosX.value = inputTextPosX.value
 
     })
    let inputPosXText = document.createElement('p')
    let inputPosXTitle = document.createTextNode('Position-X')
    inputPosXText.appendChild(inputPosXTitle)
    divRow.appendChild(inputPosXText)
    divRow.appendChild(inputTextPosX)
    divRow.appendChild(inputPosX)


    let divRow0 = document.createElement('div')
    divRow0.setAttribute('class','viewer_element_setting_div_row')


    let inputTextPosY = document.createElement('input')
    inputTextPosY.type = 'text'
    inputTextPosY.setAttribute('class','sideInput')
    let inputPosY = document.createElement('input')
    inputPosY.type = 'range'
    inputPosY.max = 200
    inputPosY.step = 0.01
    inputPosY.min = -200
    inputPosY.value = _allEditorElm[id].pos.y
    inputPosY.addEventListener('input',()=>{
       _allEditorElm[id].object.position.y = inputPosY.value
       _allEditorElm[id].pos.y = inputPosY.value

    })
    inputTextPosY.addEventListener('input',()=>{
        _allEditorElm[id].object.position.y = inputTextPosY.value
        _allEditorElm[id].pos.y = inputTextPosY.value
        inputPosY.value = inputTextPosY.value
 
     })

    let inputPosYText = document.createElement('p')
    let inputPosYTitle = document.createTextNode('Position-Y')
    inputPosYText.appendChild(inputPosYTitle)

    divRow0.appendChild(inputPosYText)
    divRow0.appendChild(inputTextPosY)
    divRow0.appendChild(inputPosY)



    let divRow1 = document.createElement('div')
    divRow1.setAttribute('class','viewer_element_setting_div_row')


    let inputTextPosZ = document.createElement('input')
    inputTextPosZ.type = 'text'
    inputTextPosZ.setAttribute('class','sideInput')
    let inputPosZ = document.createElement('input')
    inputPosZ.type = 'range'
    inputPosZ.max = 200
    inputPosZ.step =  0.01
    inputPosZ.min = -200
    inputPosZ.value = _allEditorElm[id].pos.z
    inputPosZ.addEventListener('input',()=>{
       _allEditorElm[id].object.position.z = inputPosZ.value
       _allEditorElm[id].pos.z = inputPosZ.value

    })
    inputTextPosZ.addEventListener('input',()=>{
        _allEditorElm[id].object.position.z = inputTextPosZ.value
        _allEditorElm[id].pos.z = inputTextPosZ.value
        inputPosZ.value = inputTextPosZ.value
 
     })
    let inputPosZText = document.createElement('p')
    let inputPosZTitle = document.createTextNode(`Position-Z`)
    inputPosZText.appendChild(inputPosZTitle)
    
    divRow1.appendChild(inputPosZText)
    divRow1.appendChild(inputTextPosZ)
    divRow1.appendChild(inputPosZ)



    
    let divRow2 = document.createElement('div')
    divRow2.setAttribute('class','viewer_element_setting_div_row')

    let inputPower = document.createElement('input')
    inputPower.type = 'range'
    inputPower.max = 10
    inputPower.min = 0
    inputPower.value = _allEditorElm[id].power
   
    if(object.type.includes('AmbientLight') || object.type.includes('DirectionalLight')){
        console.log('ambient light color choser')
        inputPower.addEventListener('input',()=>{
            _allEditorElm[id].object.intensity = inputPower.value
            _allEditorElm[id].power = inputPower.value
     
         })
    }
    else{
        inputPower.addEventListener('input',()=>{
            _allEditorElm[id].object.power = inputPower.value
            _allEditorElm[id].power = inputPower.value
     
         })
    }


  
    
    let inputPowerText = document.createElement('p')
    let inputPowerTitle = document.createTextNode('Light Power')
    inputPowerText.appendChild(inputPowerTitle)
    
    divRow2.appendChild(inputPowerText)
    divRow2.appendChild(inputPower)


    let divRow3 = document.createElement('div')
    divRow3.setAttribute('class','viewer_element_setting_div_row')
    
    let inputColor = document.createElement('input')
    inputColor.type = 'color'
    inputColor.value = _allEditorElm[id].color
    

    inputColor.addEventListener('change',()=>{
        _allEditorElm[id].color = inputColor.value
        _allEditorElm[id].object.color = new THREE.Color(inputColor.value)
    })
    

    let inputColorText = document.createElement('p')
    let inputColorTitle = document.createTextNode('Light Color')
    inputColorText.appendChild(inputColorTitle)
    
    divRow3.appendChild(inputColorText)
    divRow3.appendChild(inputColor)


    divWrapper.appendChild(divRow)
    divWrapper.appendChild(divRow0)
    divWrapper.appendChild(divRow1)
    divWrapper.appendChild(divRow2)
    divWrapper.appendChild(divRow3)

     


    let panel = document.querySelector('.viewer_model_editor_panel_elements_settings_panel')
    removeAllChildNodes(panel)
    panel.appendChild(divWrapper)
}
// model

else if(object.type.includes('Group')){

    let divWrapper = document.createElement('div')
    divWrapper.setAttribute('class','viewer_element_setting_div')

    let divRow = document.createElement('div')
    divRow.setAttribute('class','viewer_element_setting_div_row')


    let inputTextPosX = document.createElement('input')
    inputTextPosX.type = 'text'
    inputTextPosX.setAttribute('class','sideInput')
    let inputPosX = document.createElement('input')
    inputPosX.type = 'range'
    inputPosX.max = 200
    inputPosX.step =  0.01
    inputPosX.min = -200
    inputPosX.value = _allEditorElm[id].pos.x
    inputPosX.addEventListener('input',()=>{
       _allEditorElm[id].object.position.x = inputPosX.value
       _allEditorElm[id].pos.x = inputPosX.value

    })

    inputTextPosX.addEventListener('input',()=>{
        _allEditorElm[id].object.position.x = inputTextPosX.value
        _allEditorElm[id].pos.x = inputTextPosX.value
        inputPosX.value = inputTextPosX.value
    })
    let inputPosXText = document.createElement('p')
    let inputPosXTitle = document.createTextNode('Position-X')
    inputPosXText.appendChild(inputPosXTitle)
    divRow.appendChild(inputPosXText)
    divRow.appendChild(inputTextPosX)
    divRow.appendChild(inputPosX)


    let divRow0 = document.createElement('div')
    divRow0.setAttribute('class','viewer_element_setting_div_row')

    
    let inputTextPosY = document.createElement('input')
    inputTextPosY.type = 'text'
    inputTextPosY.setAttribute('class','sideInput')
    let inputPosY = document.createElement('input')
    inputPosY.type = 'range'
    inputPosY.max = 200
    inputPosY.step =  0.01
    inputPosY.min = -200
    inputPosY.value = _allEditorElm[id].pos.y
    inputPosY.addEventListener('input',()=>{
       _allEditorElm[id].object.position.y = inputPosY.value
       _allEditorElm[id].pos.y = inputPosY.value

    })
    inputTextPosY.addEventListener('input',()=>{
        _allEditorElm[id].object.position.y = inputTextPosY.value
        _allEditorElm[id].pos.y = inputTextPosY.value
        inputPosY.value = inputTextPosY.value
 
     })
    let inputPosYText = document.createElement('p')
    let inputPosYTitle = document.createTextNode('Position-Y')
    inputPosYText.appendChild(inputPosYTitle)

    divRow0.appendChild(inputPosYText)
    divRow0.appendChild(inputTextPosY)
    divRow0.appendChild(inputPosY)



    let divRow1 = document.createElement('div')
    divRow1.setAttribute('class','viewer_element_setting_div_row')

        
    let inputTextPosZ = document.createElement('input')
    inputTextPosZ.type = 'text'
    inputTextPosZ.setAttribute('class','sideInput')
    let inputPosZ = document.createElement('input')
    inputPosZ.type = 'range'
    inputPosZ.max = 200
    inputPosZ.step =  0.01
    inputPosZ.min = -200
    inputPosZ.value = _allEditorElm[id].pos.z
    inputPosZ.addEventListener('input',()=>{
       _allEditorElm[id].object.position.z = inputPosZ.value
       _allEditorElm[id].pos.z = inputPosZ.value

    })
    inputTextPosZ.addEventListener('input',()=>{
        _allEditorElm[id].object.position.z = inputTextPosZ.value
        _allEditorElm[id].pos.z = inputTextPosZ.value
        inputPosZ.value = inputTextPosZ.value
 
     })
     
    let inputPosZText = document.createElement('p')
    let inputPosZTitle = document.createTextNode(`Position-Z`)
    inputPosZText.appendChild(inputPosZTitle)
    
    divRow1.appendChild(inputPosZText)
    divRow1.appendChild(inputTextPosZ)
    divRow1.appendChild(inputPosZ)




    let divRow2 = document.createElement('div')
    divRow2.setAttribute('class','viewer_element_setting_div_row')

    let inputTextRotZ = document.createElement('input')
    inputTextRotZ.type = 'text'
    inputTextRotZ.setAttribute('class','sideInput')

    let inputRotZ = document.createElement('input')
    inputRotZ.type = 'range'
    inputRotZ.max = 200
    inputRotZ.step =  0.0001
    inputRotZ.min = -200
    inputRotZ.value = _allEditorElm[id].rotate.z
    inputRotZ.addEventListener('input',()=>{
       _allEditorElm[id].object.rotation.z = inputRotZ.value
       _allEditorElm[id].rotate.z = inputRotZ.value

    })
    inputTextRotZ.addEventListener('input',()=>{
        _allEditorElm[id].object.rotation.z = inputTextRotZ.value
        _allEditorElm[id].rotate.z = inputTextRotZ.value
        inputRotZ.value =inputTextRotZ.value
 
     })

    let inputRotZText = document.createElement('p')
    let inputRotZTitle = document.createTextNode(`Rotate-Z`)
    inputRotZText.appendChild(inputRotZTitle)
    
    divRow2.appendChild(inputRotZText)
    divRow2.appendChild(inputTextRotZ)
    divRow2.appendChild(inputRotZ)




    let divRow3 = document.createElement('div')
    divRow3.setAttribute('class','viewer_element_setting_div_row')

    
    let inputTextRotY = document.createElement('input')
    inputTextRotY.type = 'text'
    inputTextRotY.setAttribute('class','sideInput')
    let inputRotY = document.createElement('input')
    inputRotY.type = 'range'
    inputRotY.max = 200
    inputRotY.step =  0.0001
    inputRotY.min = -200
    inputRotY.value = _allEditorElm[id].rotate.y
    inputRotY.addEventListener('input',()=>{
       _allEditorElm[id].object.rotation.y = inputRotY.value
       _allEditorElm[id].rotate.y = inputRotY.value

    })
    inputTextRotY.addEventListener('input',()=>{
        _allEditorElm[id].object.rotation.y = inputTextRotY.value
        _allEditorElm[id].rotate.y = inputTextRotY.value
        inputRotY.value = inputTextRotY.value
 
     })
    let inputRotYText = document.createElement('p')
    let inputRotYTitle = document.createTextNode(`Rotate-Y`)
    inputRotYText.appendChild(inputRotYTitle)
    
    divRow3.appendChild(inputRotYText)
    divRow3.appendChild(inputTextRotY)
    divRow3.appendChild(inputRotY)



    let divRow4 = document.createElement('div')
    divRow4.setAttribute('class','viewer_element_setting_div_row')

    let inputTextRotX = document.createElement('input')
    inputTextRotX.type = 'text'
    inputTextRotX.setAttribute('class','sideInput')
    let inputRotX = document.createElement('input')
    inputRotX.type = 'range'
    inputRotX.max = 200
    inputRotX.step =  0.0001
    inputRotX.min = -200
    inputRotX.value = _allEditorElm[id].rotate.x
    inputRotX.addEventListener('input',()=>{
       _allEditorElm[id].object.rotation.x = inputRotX.value
       _allEditorElm[id].rotate.x = inputRotX.value

    })
    inputTextRotX.addEventListener('input',()=>{
        _allEditorElm[id].object.rotation.x = inputTextRotX.value
        _allEditorElm[id].rotate.x = inputTextRotX.value
        inputRotX.value = inputTextRotX.value

     })

    let inputRotXText = document.createElement('p')
    let inputRotXTitle = document.createTextNode(`Rotate-X`)
    inputRotXText.appendChild(inputRotXTitle)
    
    divRow4.appendChild(inputRotXText)
    divRow4.appendChild(inputTextRotX)
    divRow4.appendChild(inputRotX)



    let divRow5 = document.createElement('div')
    divRow5.setAttribute('class','viewer_element_setting_div_row')


    let inputTextScX = document.createElement('input')
    inputTextScX.type = 'text'
    inputTextScX.setAttribute('class','sideInput')

    let inputScX = document.createElement('input')
    inputScX.type = 'range'
    inputScX.max = 100
    inputScX.step = 0.01
    inputScX.min = -100
    inputScX.value = _allEditorElm[id].scale.x
    inputScX.addEventListener('input',()=>{
       _allEditorElm[id].object.scale.x = inputScX.value
       _allEditorElm[id].scale.x = inputScX.value

    })
    inputTextScX.addEventListener('input',()=>{
       _allEditorElm[id].object.scale.x = inputTextScX.value
       _allEditorElm[id].scale.x = inputTextScX.value
       inputScX.value = inputTextScX.value

    })

    let inputScXText = document.createElement('p')
    let inputScXTitle = document.createTextNode(`Scale-X`)
    inputScXText.appendChild(inputScXTitle)
    
    divRow5.appendChild(inputScXText)
    divRow5.appendChild(inputTextScX)
    divRow5.appendChild(inputScX)


    let divRow6 = document.createElement('div')
    divRow6.setAttribute('class','viewer_element_setting_div_row')

    let inputTextScY = document.createElement('input')
    inputTextScY.type = 'text'
    inputTextScY.setAttribute('class','sideInput')
    let inputScY = document.createElement('input')
    inputScY.type = 'range'
    inputScY.max = 100
    inputScY.step =  0.01
    inputScY.min = -100
    inputScY.value = _allEditorElm[id].scale.y
    inputScY.addEventListener('input',()=>{
       _allEditorElm[id].object.scale.y = inputScY.value
       _allEditorElm[id].scale.y = inputScY.value

    })
    inputTextScY.addEventListener('input',()=>{
        _allEditorElm[id].object.scale.y = inputTextScY.value
        _allEditorElm[id].scale.y = inputTextScY.value
        inputScY.value = inputTextScY.value
 
     })
     
    let inputScYText = document.createElement('p')
    let inputScYTitle = document.createTextNode(`Scale-Y`)
    inputScYText.appendChild(inputScYTitle)
    
    divRow6.appendChild(inputScYText)
    divRow6.appendChild(inputTextScY)
    divRow6.appendChild(inputScY)



    let divRow7 = document.createElement('div')
    divRow7.setAttribute('class','viewer_element_setting_div_row')

    let inputTextScZ = document.createElement('input')
    inputTextScZ.type = 'text'
    inputTextScZ.setAttribute('class','sideInput')
    let inputScZ = document.createElement('input')
    inputScZ.type = 'range'
    inputScZ.max = 100
    inputScZ.step =  0.01
    inputScZ.min = -100
    inputScZ.value = _allEditorElm[id].scale.z
    inputScZ.addEventListener('input',()=>{
       _allEditorElm[id].object.scale.z = inputScZ.value
       _allEditorElm[id].scale.z = inputScZ.value

    })
    inputTextScZ.addEventListener('input',()=>{
        _allEditorElm[id].object.scale.z = inputTextScZ.value
        _allEditorElm[id].scale.z = inputTextScZ.value
        inputScZ.value = inputTextScZ.value
 
     })

    let inputScZText = document.createElement('p')
    let inputScZTitle = document.createTextNode(`Scale-Z`)
    inputScZText.appendChild(inputScZTitle)
    
    divRow7.appendChild(inputScZText)
    divRow7.appendChild(inputTextScZ)
    divRow7.appendChild(inputScZ)







    



    divWrapper.appendChild(divRow)
    divWrapper.appendChild(divRow0)
    divWrapper.appendChild(divRow1)
    divWrapper.appendChild(divRow4)
    divWrapper.appendChild(divRow3)
    divWrapper.appendChild(divRow2)
    divWrapper.appendChild(divRow5)
    divWrapper.appendChild(divRow6)
    divWrapper.appendChild(divRow7)



     


    let panel = document.querySelector('.viewer_model_editor_panel_elements_settings_panel')
    removeAllChildNodes(panel)
    panel.appendChild(divWrapper)


}
// end of model


// ground
else{


    let divWrapper = document.createElement('div')
    divWrapper.setAttribute('class','viewer_element_setting_div')

    let divRow = document.createElement('div')
    divRow.setAttribute('class','viewer_element_setting_div_row')


    let inputTextPosX = document.createElement('input')
    inputTextPosX.type = 'text'
    inputTextPosX.setAttribute('class','sideInput')
    let inputPosX = document.createElement('input')
    inputPosX.type = 'range'
    inputPosX.max = 200
    inputPosX.step =  0.01
    inputPosX.min = -200
    inputPosX.value = _allEditorElm[id].pos.x
    inputPosX.addEventListener('input',()=>{
       _allEditorElm[id].object.position.x = inputPosX.value
       _allEditorElm[id].pos.x = inputPosX.value

    })

    inputTextPosX.addEventListener('input',()=>{
        _allEditorElm[id].object.position.x = inputTextPosX.value
        _allEditorElm[id].pos.x = inputTextPosX.value
        inputPosX.value = inputTextPosX.value
    })
    let inputPosXText = document.createElement('p')
    let inputPosXTitle = document.createTextNode('Position-X')
    inputPosXText.appendChild(inputPosXTitle)
    divRow.appendChild(inputPosXText)
    divRow.appendChild(inputTextPosX)
    divRow.appendChild(inputPosX)


    let divRow0 = document.createElement('div')
    divRow0.setAttribute('class','viewer_element_setting_div_row')

    
    let inputTextPosY = document.createElement('input')
    inputTextPosY.type = 'text'
    inputTextPosY.setAttribute('class','sideInput')
    let inputPosY = document.createElement('input')
    inputPosY.type = 'range'
    inputPosY.max = 200
    inputPosY.step =  0.01
    inputPosY.min = -200
    inputPosY.value = _allEditorElm[id].pos.y
    inputPosY.addEventListener('input',()=>{
       _allEditorElm[id].object.position.y = inputPosY.value
       _allEditorElm[id].pos.y = inputPosY.value

    })
    inputTextPosY.addEventListener('input',()=>{
        _allEditorElm[id].object.position.y = inputTextPosY.value
        _allEditorElm[id].pos.y = inputTextPosY.value
        inputPosY.value = inputTextPosY.value
 
     })
    let inputPosYText = document.createElement('p')
    let inputPosYTitle = document.createTextNode('Position-Y')
    inputPosYText.appendChild(inputPosYTitle)

    divRow0.appendChild(inputPosYText)
    divRow0.appendChild(inputTextPosY)
    divRow0.appendChild(inputPosY)



    let divRow1 = document.createElement('div')
    divRow1.setAttribute('class','viewer_element_setting_div_row')

        
    let inputTextPosZ = document.createElement('input')
    inputTextPosZ.type = 'text'
    inputTextPosZ.setAttribute('class','sideInput')
    let inputPosZ = document.createElement('input')
    inputPosZ.type = 'range'
    inputPosZ.max = 200
    inputPosZ.step =  0.01
    inputPosZ.min = -200
    inputPosZ.value = _allEditorElm[id].pos.z
    inputPosZ.addEventListener('input',()=>{
       _allEditorElm[id].object.position.z = inputPosZ.value
       _allEditorElm[id].pos.z = inputPosZ.value

    })
    inputTextPosZ.addEventListener('input',()=>{
        _allEditorElm[id].object.position.z = inputTextPosZ.value
        _allEditorElm[id].pos.z = inputTextPosZ.value
        inputPosZ.value = inputTextPosZ.value
 
     })
     
    let inputPosZText = document.createElement('p')
    let inputPosZTitle = document.createTextNode(`Position-Z`)
    inputPosZText.appendChild(inputPosZTitle)
    
    divRow1.appendChild(inputPosZText)
    divRow1.appendChild(inputTextPosZ)
    divRow1.appendChild(inputPosZ)




    let divRow2 = document.createElement('div')
    divRow2.setAttribute('class','viewer_element_setting_div_row')

    let inputTextRotZ = document.createElement('input')
    inputTextRotZ.type = 'text'
    inputTextRotZ.setAttribute('class','sideInput')

    let inputRotZ = document.createElement('input')
    inputRotZ.type = 'range'
    inputRotZ.max = 200
    inputRotZ.step =  0.0001
    inputRotZ.min = -200
    inputRotZ.value = _allEditorElm[id].rotate.z
    inputRotZ.addEventListener('input',()=>{
       _allEditorElm[id].object.rotation.z = inputRotZ.value
       _allEditorElm[id].rotate.z = inputRotZ.value

    })
    inputTextRotZ.addEventListener('input',()=>{
        _allEditorElm[id].object.rotation.z = inputTextRotZ.value
        _allEditorElm[id].rotate.z = inputTextRotZ.value
        inputRotZ.value =inputTextRotZ.value
 
     })

    let inputRotZText = document.createElement('p')
    let inputRotZTitle = document.createTextNode(`Rotate-Z`)
    inputRotZText.appendChild(inputRotZTitle)
    
    divRow2.appendChild(inputRotZText)
    divRow2.appendChild(inputTextRotZ)
    divRow2.appendChild(inputRotZ)




    let divRow3 = document.createElement('div')
    divRow3.setAttribute('class','viewer_element_setting_div_row')

    
    let inputTextRotY = document.createElement('input')
    inputTextRotY.type = 'text'
    inputTextRotY.setAttribute('class','sideInput')
    let inputRotY = document.createElement('input')
    inputRotY.type = 'range'
    inputRotY.max = 200
    inputRotY.step =  0.0001
    inputRotY.min = -200
    inputRotY.value = _allEditorElm[id].rotate.y
    inputRotY.addEventListener('input',()=>{
       _allEditorElm[id].object.rotation.y = inputRotY.value
       _allEditorElm[id].rotate.y = inputRotY.value

    })
    inputTextRotY.addEventListener('input',()=>{
        _allEditorElm[id].object.rotation.y = inputTextRotY.value
        _allEditorElm[id].rotate.y = inputTextRotY.value
        inputRotY.value = inputTextRotY.value
 
     })
    let inputRotYText = document.createElement('p')
    let inputRotYTitle = document.createTextNode(`Rotate-Y`)
    inputRotYText.appendChild(inputRotYTitle)
    
    divRow3.appendChild(inputRotYText)
    divRow3.appendChild(inputTextRotY)
    divRow3.appendChild(inputRotY)



    let divRow4 = document.createElement('div')
    divRow4.setAttribute('class','viewer_element_setting_div_row')

    let inputTextRotX = document.createElement('input')
    inputTextRotX.type = 'text'
    inputTextRotX.setAttribute('class','sideInput')
    let inputRotX = document.createElement('input')
    inputRotX.type = 'range'
    inputRotX.max = 200
    inputRotX.step =  0.0001
    inputRotX.min = -200
    inputRotX.value = _allEditorElm[id].rotate.x
    inputRotX.addEventListener('input',()=>{
       _allEditorElm[id].object.rotation.x = inputRotX.value
       _allEditorElm[id].rotate.x = inputRotX.value

    })
    inputTextRotX.addEventListener('input',()=>{
        _allEditorElm[id].object.rotation.x = inputTextRotX.value
        _allEditorElm[id].rotate.x = inputTextRotX.value
        inputRotX.value = inputTextRotX.value

     })

    let inputRotXText = document.createElement('p')
    let inputRotXTitle = document.createTextNode(`Rotate-X`)
    inputRotXText.appendChild(inputRotXTitle)
    
    divRow4.appendChild(inputRotXText)
    divRow4.appendChild(inputTextRotX)
    divRow4.appendChild(inputRotX)



    let divRow5 = document.createElement('div')
    divRow5.setAttribute('class','viewer_element_setting_div_row')


    let inputTextScX = document.createElement('input')
    inputTextScX.type = 'text'
    inputTextScX.setAttribute('class','sideInput')

    let inputScX = document.createElement('input')
    inputScX.type = 'range'
    inputScX.max = 100
    inputScX.step = 0.01
    inputScX.min = -100
    inputScX.value = _allEditorElm[id].scale.x
    inputScX.addEventListener('input',()=>{
       _allEditorElm[id].object.scale.x = inputScX.value
       _allEditorElm[id].scale.x = inputScX.value

    })
    inputTextScX.addEventListener('input',()=>{
       _allEditorElm[id].object.scale.x = inputTextScX.value
       _allEditorElm[id].scale.x = inputTextScX.value
       inputScX.value = inputTextScX.value

    })

    let inputScXText = document.createElement('p')
    let inputScXTitle = document.createTextNode(`Scale-X`)
    inputScXText.appendChild(inputScXTitle)
    
    divRow5.appendChild(inputScXText)
    divRow5.appendChild(inputTextScX)
    divRow5.appendChild(inputScX)


    let divRow6 = document.createElement('div')
    divRow6.setAttribute('class','viewer_element_setting_div_row')

    let inputTextScY = document.createElement('input')
    inputTextScY.type = 'text'
    inputTextScY.setAttribute('class','sideInput')
    let inputScY = document.createElement('input')
    inputScY.type = 'range'
    inputScY.max = 100
    inputScY.step =  0.01
    inputScY.min = -100
    inputScY.value = _allEditorElm[id].scale.y
    inputScY.addEventListener('input',()=>{
       _allEditorElm[id].object.scale.y = inputScY.value
       _allEditorElm[id].scale.y = inputScY.value

    })
    inputTextScY.addEventListener('input',()=>{
        _allEditorElm[id].object.scale.y = inputTextScY.value
        _allEditorElm[id].scale.y = inputTextScY.value
        inputScY.value = inputTextScY.value
 
     })
     
    let inputScYText = document.createElement('p')
    let inputScYTitle = document.createTextNode(`Scale-Y`)
    inputScYText.appendChild(inputScYTitle)
    
    divRow6.appendChild(inputScYText)
    divRow6.appendChild(inputTextScY)
    divRow6.appendChild(inputScY)



    let divRow7 = document.createElement('div')
    divRow7.setAttribute('class','viewer_element_setting_div_row')

    let inputTextScZ = document.createElement('input')
    inputTextScZ.type = 'text'
    inputTextScZ.setAttribute('class','sideInput')
    let inputScZ = document.createElement('input')
    inputScZ.type = 'range'
    inputScZ.max = 100
    inputScZ.step =  0.01
    inputScZ.min = -100
    inputScZ.value = _allEditorElm[id].scale.z
    inputScZ.addEventListener('input',()=>{
       _allEditorElm[id].object.scale.z = inputScZ.value
       _allEditorElm[id].scale.z = inputScZ.value

    })
    inputTextScZ.addEventListener('input',()=>{
        _allEditorElm[id].object.scale.z = inputTextScZ.value
        _allEditorElm[id].scale.z = inputTextScZ.value
        inputScZ.value = inputTextScZ.value
 
     })

    let inputScZText = document.createElement('p')
    let inputScZTitle = document.createTextNode(`Scale-Z`)
    inputScZText.appendChild(inputScZTitle)
    
    divRow7.appendChild(inputScZText)
    divRow7.appendChild(inputTextScZ)
    divRow7.appendChild(inputScZ)







    let divRow8 = document.createElement('div')
    divRow8.setAttribute('class','viewer_element_setting_div_row')
    
    let inputColor = document.createElement('input')
    inputColor.type = 'color'
    inputColor.value = _allEditorElm[id].color
    

    inputColor.addEventListener('change',()=>{
        _allEditorElm[id].color = inputColor.value
        _allEditorElm[id].object.material.color = new THREE.Color(inputColor.value)
    })
    let inputColorText = document.createElement('p')
    let inputColorTitle = document.createTextNode('Ground Color')
    inputColorText.appendChild(inputColorTitle)
    
    divRow8.appendChild(inputColorText)
    divRow8.appendChild(inputColor)


    divWrapper.appendChild(divRow)
    divWrapper.appendChild(divRow0)
    divWrapper.appendChild(divRow1)
    divWrapper.appendChild(divRow4)
    divWrapper.appendChild(divRow3)
    divWrapper.appendChild(divRow2)
    divWrapper.appendChild(divRow5)
    divWrapper.appendChild(divRow6)
    divWrapper.appendChild(divRow7)

    divWrapper.appendChild(divRow8)


     


    let panel = document.querySelector('.viewer_model_editor_panel_elements_settings_panel')
    removeAllChildNodes(panel)
    panel.appendChild(divWrapper)

    // end of ground
   }


}



function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


document.addEventListener('DOMContentLoaded',()=>{

    initMiniEditor()

});
