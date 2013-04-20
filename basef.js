
function ref(x){
    this.set=function(y){x=y;};
    this.get=function(){return x;};
    this.run=function(f){x=f(x);};
}

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
//from is array

function cmf_push(r,i){
    r.push(i);
    return r;
}
function cmf_concat(r,i){
    return r.concat(i);
}
function rcmf_push(ref_r,i){
    ref_r.run(function(x){return x.push(i);});
}
function rcmf_concat(ref_r,i){
    ref_r.run(function(x){return x.concat(i);});
}
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
function rcmf(from, ref_dest, fref_collect, fmap, fflip){
    fref_collect= fref_collect||function(ref_dest,val){};
    fmap= fmap||function(x){return x;};
    fflip= fflip||function(x){return true;};
    for(i in from){
	if(fflip(from[i])){
	    fref_collect(dest,fmap(from[i]));
	}
    }
    return dest;
}

var render= {
    element:{
	aconcat:function(x){
	    this.toHtml=function(){
		return cmf(x,"", cmfc_concat);
	    }
	}
    },
    static_hello:function(){
	txt= new ref("hello");
	this.txt= txt;
	this.show=function(){
	    return {
		toHtml:function(){
		    return escapeHtml(txt.get());
		}
	    }
	};
    }
};

var data_root={
    render_root:null,
};

function get_render(){
    var tmp= data_root.render_root();
    return tmp.toHtml();
}

function init(){
    data_root.render_root= (new render.static_hello()).show;
}
init();