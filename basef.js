
function show(x){
    var ret=x+"{";
    for(i in x){
	ret+= i+"=";
	ret+= x[i]+", ";
    }
    ret+="}";
    return ret;
}

function run_code(t){
    var res= eval(t);
    return res;
}

function escapeHtml(text) {
    return text
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;")
         .replace(/\n/g, "<br/>");
 }
//from is array
function cmf(from, dest, fcollect, fmap, fflip){
    fcollect= fcollect||function(dest,val){};
    fmap= fmap||function(x){return x;};
    fflip= fflip||function(x){return true;};
    for(i in from){
	if(fflip(from[i])){
	    dest= fcollect(dest,fmap(from[i])); // iter with self-copy opt
	}
    }
    return dest;
}

function append_arr(r,i){
    r.push(i);
    return r;
}

function concat_string(r,i){
    return r.concat(i);
}
function concat_arr(r,i){
    return r.concat(i);
}

dataroot={};

buffer={
    curbuffer:function(){
	return dataroot.curbuffer;
    },
    get_buffer:function(buffer_name){
	return dataroot.buffers[buffer_name];
    },
    set_buffer:function(buffer_name,text){
	return dataroot.buffers[buffer_name]= text;
    },
    alloc_buffer:function(buffer_name){
	buffer.set_buffer(buffer_name, "empty");
    },
};
vbuf={
    memdata:function(mem){
	this.mem= mem;
	this.toString= function(){return "binnary-data";}
	this.toHtml= function(){
	    return escapeHtml(this.mem);
	}
    },
    text:function(txt){
	this.txt= txt;
	this.toString= function(){return this.txt;}
	this.toHtml= function(){
	    return escapeHtml(this.txt);
	}
    },

    html_modify:function(val,name,args){
	args= args||"";
	this.item= val;
	this.toString= function(){
	    return this.item.toString();
	}
	this.toHtml= function(){
	    return "<"+name+" "+args+">"+this.item.toHtml()+"</"+name+">";
	}
    },
};
pipeline={
    const_text:function(text){
	this.name= "const_text";
	this.text= text;
	this.transform= function(ignored_arg){
	    return [this.text];
	}
    },
    split_text:function(separator){
	separator= separator||"";
	this.name= "split_text";
	//split a text to vbuf.text array
	split_text= function(text,dest){
	    var sp= text.split(separator);
	    dest= dest||[];
	    return cmf(sp, dest, append_arr,
		       function(i){return new vbuf.text(i);}
		      );
	};
	//concat split_text
	this.transform= function(arr){
	    return cmf(arr, [], concat_arr,
		       function(text){return split_text(text.toString());}
		      );
	}
    },
    red5: function(){
	this.name= "red5";
	this.transform= function(arr){
	    return cmf(arr, [], append_arr,
		       function(ch){
			   if(ch.toString()=="5"){
			       return new vbuf.html_modify(ch,"font", 'color="red"');
			   }else{
			       return ch;
			   }
		       }
		      );
	}
    },
};


//to html
render_pipeline= function(pipes){
    var tmp= cmf(pipes, [], 
		 function(arr,pipe){return pipe.transform(arr);}
		);
    return cmf(tmp,"", concat_string,
	       function(i){return i.toHtml();}
	      );
}
render_curbuffer= function(){
    return render_pipeline(dataroot.pipeline);
}
//--------

function init(){
    ////buffer
    //dataroot.buffers={};
    //dataroot.curbuffer="empty";
    //buffer.alloc_buffer(dataroot.curbuffer);

    //pipeline
    dataroot.pipeline= [
	new pipeline.const_text("test red5:  haha 12345678 and 654321"),
	new pipeline.split_text(""),
	new pipeline.red5(),
    ];
}
init();

