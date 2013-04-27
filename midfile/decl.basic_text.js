this file is make from ../get_js_decl.py 
0003|var basic_text={
0004|    render_item:{
0005|	text:function(text){
0006|	    var self= this;
0007|	    this.text= text;
0008|	    this.toHtml= function(){return escapeHtml(self.text);};
0010|	arr:function(its,prefix_Html,split_Html,end_Html){
0011|	    var self= this;
0012|	    this.item= its||[];
0013|	    this.prefix_Html= prefix_Html||"";
0014|	    this.split_Html= split_Html||"";
0015|	    this.end_Html= end_Html||"";
0016|	    this.toHtml= function(){
0022|	Html_tag:function(typ,val,subit){
0023|	    this.text= subit.text;
0024|	    this.toHtml= function(){return "<"+typ+" "+val+">"+subit.toHtml()+"</"+typ+">";};
0027|    pipe_text:function(text){
0028|	var self= this;
0029|	this.text= text;
0030|	this.render= function(){return [new basic_text.render_item.text(self.text)];};
0031|	this.update_listener= [];
0032|	this.update= function(x){
0038|    pipe_token:function(base){
0039|	var self= this;
0040|	this.base= base;
0041|	var is_token_char= function(ch){
0044|	var token_from_text= function(text){
0065|	this.render= function(){
0074|	this.update_listener= [];
0075|	this.update= function(x){
0081|    pipe_tag:function(base){
0082|	var this_pipe= this;
0083|	this.base= base;
0087|	this.item= [];
0088|	this.make_item= function(cond,typ,val){
0089|	    return {cond:cond, typ:typ, val:val};
0091|	var translate= function(rdit){
0100|	this.render=function(){
0103|	this.update_listener=[];
0104|	this.update=function(b){
0105|	    this_pipe.base=b;
0106|	    this_pipe.text=b.text;
0112|    pipe_lines:function(base){
0113|	var self= this;
0114|	this.base= base;
0118|	this.render= function(){
0121|	    var ret= cmf(self.base.render(),[],function(lines,rdobj){
0126|		    curline= cmf(texts,curline,function(cl,str){
0143|	this.update_listener=[];
0144|	this.update=function(b){
0145|	    this_pipe.base=b;
0146|	    this_pipe.text=b.text;
0153|var data_root={
0154|    render_root:null,
0169|    redl.item.push(redl.make_item(function(x){return x.text=="world";},"a","class=red"));
