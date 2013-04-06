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



var dataroot={};

//buffer
function get_curbuffer(){
    return dataroot.curbuffer;
}
function get_buffer(buffer_name){
    return dataroot.buffers[buffer_name];
}
function set_buffer(buffer_name,text){
    return dataroot.buffers[buffer_name]= text;
}
function alloc_buffer(buffer_name){
    set_buffer(buffer_name, "empty");
}
//pipelines
function pipeline_simple(){
    this.pool=[];
    this.render= function(d){
	var tmp= d;
	for(i in this.pool){
	    tmp= i(d);
	}
	return tmp;
    };
}

function pipeline_echo(){
    this.render= function(d){
	return {
	    text:d,
	    toHtml:function(){
		return escapeHtml(this.text);
	    }
	};
    }
}

function render_pipeline(pipe,d){
    var tmp= pipe.render(d);
    return tmp.toHtml();
}

function render_curbuffer(){
    var bf= get_buffer(get_curbuffer());
    return render_pipeline(dataroot.pipeline, bf);
}

//--------

function init(){
    //buffer
    dataroot.buffers={};
    dataroot.curbuffer="empty";
    alloc_buffer(dataroot.curbuffer);

    //pipeline
    dataroot.pipeline= new pipeline_echo();
}
init();

function test(){
    return render_pipeline(dataroot.pipeline,"132456");
}
//alert(test());
