import {config} from './config';

function getNewsList({index, search}, callback){
	let result = {
		json: null,
		err: null
	}
	fetch(config.getUrlParams(`${config.endpoint}/news`, {'index':index, 'search': search}), config.getconfig).then(res=>{
		return {status: res.status, json: res.json()};
	}).then(resfetch=>{
		if(resfetch.status === 200) result.json = resfetch.json;
		else result.err = resfetch.json.message;
		callback(result);
	}).catch(err=>{
		result.err = err;
		callback(result);
	});
}

function loadNews(id, callback){
	let result = {
		json: null,
		err: null
	}
	fetch(`${config.endpoint}/news/${id}`, config.getconfig).then(res=>{
		return {status: res.status, json: res.json()};
	}).then(resfetch=>{
		if(resfetch.status === 200) result.json = resfetch.json;
		else result.err = resfetch.json.message;
		callback(result);
	}).catch(err=>{
		result.err = err;
		callback(result);
	});
}

function inputNews({title, content, id}, callback){
	let result = {
		json: null,
		err: null
	}
	fetch(`${config.endpoint}/news`, config.postdataconfig({title: title, content: content, id: id})).then(res=>{
		return {status: res.status, json: res.json()};
	}).then(resfetch=>{
		if(resfetch.status === 200) result.json = resfetch.json;
		else result.err = resfetch.json.message;
		callback(result);
	}).catch(err=>{
		result.err = err;
		callback(result);
	});
}

function deleteNews(id, callback){
	let result = {
		json: null,
		err: null
	}
	fetch(config.getUrlParams(`${config.endpoint}/news`, {'id': id}), config.deleteconfig).then(res=>{
		return {status: res.status, json: res.json()};
	}).then(resfetch=>{
		if(resfetch.status === 200) result.json = resfetch.json;
		else result.err = resfetch.json.message;
		callback(result);
	}).catch(err=>{
		result.err = err;
		callback(result);
	});
}

function updateNews({idNews, title, content}, callback){
	let result = {
		json: null,
		err: null
	}
	fetch(`${config.endpoint}/news`, config.putdataconfig({id: idNews, title: title, content: content})).then(res=>{
		return {status: res.status, json: res.json()};
	}).then(resfetch=>{
		if(resfetch.status === 200) result.json = resfetch.json;
		else result.err = resfetch.json.message;
		callback(result);
	}).catch(err=>{
		result.err = err;
		callback(result);
	});
}

export const news = {
	getNewsList,
	loadNews,
	inputNews,
	deleteNews,
	updateNews
}