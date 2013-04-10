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
         .replace(/'/g, "&#039;");
 }
function cmf(from, dest, fcollect, fmap, fflip){
    fcollect= fcollect||function(dest,val){};
    fmap= fmap||function(x){return x;};
    fflip= fflip||function(x){return true;};
    for(i in from){
	if(fflip(i)){
	    fcollect(dest,fmap(i));
	}
    }
    return dest;
}


var dataroot={};

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
	this.toHtml= function(){
	    return escapeHtml(this.mem);
	}
    },
    text:function(txt){
	this.txt= txt;
	this.toHtml= function(){
	    return escapeHtml(this.txt);
	}
	this.toString= function(){return this.txt;}
    },
    split_text:function(vbuf_text,separator){
	this.token_protype= function(type,val){
	    this.type= type;
	    this.val= val;
	}
	this.get= function(){
	    return vbuf_text.toString().split(separator||"")
	};
	this.toHtml= function(){
	    var ret="";
	    escapeHtml(cmf(this.tokens, ret, function(r,i){r+=i;}));
	    return ret;
	}
    },
    html_modify:function(){
    },
};
pipeline={
    pipeline_echo:function(){
	this.render= function(d){
	    return new vbuf.memdata(d);
	};
    },
    render_pipeline:function(pipe,d){
	var tmp= pipe.render(d);
	return tmp.toHtml();
    },

    render_curbuffer:function(){
	var bf= buffer.get_buffer(buffer.curbuffer());
	return pipeline.render_pipeline(dataroot.pipeline, bf);
    },
};

//--------

function init(){
    //buffer
    dataroot.buffers={};
    dataroot.curbuffer="empty";
    buffer.alloc_buffer(dataroot.curbuffer);

    //pipeline
    dataroot.pipeline= new pipeline.pipeline_echo();
}
init();

alert("inited");
