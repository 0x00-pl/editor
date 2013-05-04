var dom={
    create_element:function(typ,attr){
	var ret= document.createElement(typ);
	mr(null,attr,null,function(val,key){ret.setAttribute(key,val);});
	return ret;
    },
    set_html:function(d,html){
	d.innerHTML= html;
    },
    add_html:function(d,html){
	d.innerHTML+= html;
    },
    
};
