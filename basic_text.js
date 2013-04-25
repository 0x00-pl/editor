
//pipe.render >>return>> [render_item] 
var basic_text={
    render_item:{
	text:function(text){
	    var self= this;
	    this.text= text;
	    this.toHtml= function(){return escapeHtml(self.text);};
	},
	Html_tag:function(typ,val,subit){
	    this.text= subit.text;
	    this.toHtml= function(){return "<"+typ+" "+val+">"+subit.toHtml()+"</"+typ+">";};
	}
    },
    pipe_text:function(text){
	var self= this;
	this.text= text;
	this.render= function(){return [new basic_text.render_item.text(self.text)];};
	this.update_listener= [];
	this.update= function(x){
	    cmf(update_listener, null, 
		function(c,i){(i.update||fnil)(self);}
	       );
	};
    },
    pipe_token:function(base){
	var self= this;
	this.base= base;
	var is_token_char= function(ch){
	    return /[a-zA-z0-9_]/.test(ch);
	}
	var token_from_text= function(text){
	    var ret= [];
	    var last= "";
	    //�ϲ��ַ��� concat to token
	    //bad-code do-not-write-code-like-this
	    for(var i in text){
		if(is_token_char(text[i])){
		    last+=text[i];
		}else{
		    if(last!=""){
			ret.push(new basic_text.render_item.text(last));
			last= "";
		    }
		    ret.push(new basic_text.render_item.text(text[i]));
		}
	    }
	    if(last!=""){
		ret.push(new basic_text.render_item.text(last));
	    }
	    return ret;
	};
	this.render= function(){
	    return cmf(self.base.render(),[],cmf_concat,function(x){
		if(x.text){
		    return token_from_text(x.text);
		}else{
		    return [x];
		}
	    });
	}
	this.update_listener= [];
	this.update= function(x){
	    cmf(update_listener, null, 
		function(c,i){(i.update||fnil)(self);}
	       );
	};
    },
    pipe_tag:function(base){
	var this_pipe= this;
	this.base= base;
	if(base.update_listener){
	    base.update_listener.push(this);
	}
	this.item= [];
	this.make_item= function(cond,typ,val){
	    return {cond:cond, typ:typ, val:val};
	};
	var translate= function(rdit){
	    return cmf(this_pipe.item, rdit, function(render_it,it){
		if(it.cond(render_it)){
		    return new basic_text.render_item.Html_tag(it.typ, it.val, render_it);
		}else{
		    return render_it;
		}
	    });
	}
	this.render=function(){
	    return cmf(this_pipe.base.render(),[], cmf_push, function(x){return translate(x);});
	}
	this.update_listener=[];
	this.update=function(b){
	    this_pipe.base=b;
	    this_pipe.text=b.text;
	    cmf(update_listener, null, 
		function(c,i){(i.update||fnil)(this_pipe);}
	       );
	};
    },

};
var data_root={
    render_root:null,
};

function get_render(){
    var tmp= data_root.render_root();
    return cmf(tmp,"",cmf_concat,function(x){return x.toHtml();});
}

function init_hello(){
    var tx= new basic_text.pipe_text();
    tx.text= "hello world !!!";
    var ttk= new basic_text.pipe_token(tx);
//need split
    var redl= new basic_text.pipe_tag(ttk);
    redl.item.push(redl.make_item(function(x){return x.text=="world";},"a","class=red"));
    data_root.render_root= redl.render;
}

function init(){
    init_hello();
}
init();