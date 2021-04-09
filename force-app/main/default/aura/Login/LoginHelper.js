({    
    NavigatetoChildComp : function(){
       console.log('To Content Component');
        // When an option is selected, navigate to the next screen
        var evt = $A.get("e.force:navigateToComponent");
      	console.log('evt'+evt);
        evt.setParams({
            componentDef: "c:ContentPage"
            //componentAttributes :{ }
        });
        evt.fire();
    }
})