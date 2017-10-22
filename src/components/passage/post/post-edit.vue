<template>
  <div class="container">
		<div class="passage">
			<label for="header">文章标题:</label><input id="header" v-on:input="updateHeader" v-model="header">
		</div>
		<div class="tags">
			<span>标签:</span>
			<span class="selected-tags tag-to-select" v-for="(item,index) in selected" :key="item.id">#{{item.value}}  <i class="el-icon-close tag-icon" @click="delTag(index)"></i></span>
			<input class="tag-to-input" placeholder="请输入标签" @keyup.13="addTag" v-model="tag">
		</div>
		<div class="tags-to">
			<span class="tag-to-select" v-for="(item, index) in tags" :key="item.value" @click="selectThatExisted(index)">#{{item.value}}</span>
		</div>
		<textarea id="para" rows="30" v-on:input="update" v-on:change="update" v-model="content" ref="text"></textarea>
		<el-upload
			class="upload-image"
			ref="upload"
			:action="`${api}/upload/qiniu/`"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:on-success="setURL"
			:file-list="fileList"
			:auto-upload="false">
			<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
			<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
		<button class="post-passage" @click="post">上传文章</button>
		<p>请使用Markdown语法</p>
	</div>
</template>

<script>
const marked = require('marked');

export default {
	props: ['api'],
	data() {
		return {
			selected: [],
			tags: [],
			tag: '',
			timeout: null,
			content: '',
			header: '',
			fileList: [],
			count: 0,
			author: ''
		}
	},
	methods: {
		selectThatExisted(index) {
			this.selected.push(this.tags[index]);
		},
		updateHeader() {
			this.$emit('header', this.header);
		},
		update() {
			this.$emit('inputed', marked(this.content));
		},
		delTag(index) {
			this.selected.splice(index, 1);
		},
		submitUpload() {
			this.$refs.upload.submit();
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		setURL(res) {
			var rie; //全局变量
			let _url = res.files.url;
			let str = `\n\n![输入图片描述](${_url})`;
			let _this = this;
			GetCursor();
			insertText(str);
			this.content = this.$refs.text.value;
			this.update();
			function GetCursor() {
				if (document.all) {//IE要保存Range
					_this.$refs.text.focus(); 
					rie = document.selection.createRange();
				}
			}
			//光标定位与指定位置插入文本
			//str ---   要插入的字符
			function insertText(str) {
				if (document.selection) { //ie
					_this.$refs.text.focus();//先激活当前对象
					rie.text = str;
				} 
				else if (typeof _this.$refs.text.selectionStart === 'number' && typeof _this.$refs.text.selectionEnd === 'number') { //非ie
					var startPos = _this.$refs.text.selectionStart,
							endPos = _this.$refs.text.selectionEnd,
							cursorPos = startPos,
							tmpStr = _this.$refs.text.value;
					let reg = new RegExp(/\n$/g);
					let startStr = tmpStr.substring(0, startPos)
					//若光标已在新行则直接换行插入，若在已有文字的行，则换两行插入保证中间空一行
					if(reg.test(startStr)){
						str = `\n![输入图片描述](${_url})`;
					}
					_this.$refs.text.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
					cursorPos += str.length;
					_this.$refs.text.selectionStart = _this.$refs.text.selectionEnd = cursorPos;
				} 
				else {
						_this.$refs.text.value += str;
				}
			}
		},
		post() {
			let date = new Date();
			let data = {};
			let arr = [];
			for(let i in this.selected) {
				arr.push(this.selected[i].value);
			}
			data.author = this.author;
			data.header = this.header;
			data.passage2mark = marked(this.content);
			data.clock = `${date.getHours()}:`+ (date.getMinutes()<10?'0':'') + `${date.getMinutes()}`;
			data.tags = JSON.stringify(arr);
			data.count = this.count;
			this.$http.post(`${this.api}/article/new`, data).then((result) => {
				this.header = '';
				this.content = '';
				this.selected = [];
				this.tag = '';
				console.log(result);
				this.$emit('posted');
			})
		},
		addTag() {
			let a = {};
			a.value = this.tag;
			this.tag = '';
			this.selected.push(a);
		}
	},
	mounted() {
		this.$http.get(`${this.api}/article/newest/0`).then(result => {
			let date = new Date();
			let o = result.data.article;
			date = String(date.getFullYear()) + ((date.getMonth()+1)>9?'':'0') + String(date.getMonth()+1) + (date.getDate()>9?'':'0') + String(date.getDate());
			if(o[0].timeStamp.slice(0, 8) == date){
				this.count = Number(o[0].timeStamp.slice(8)) + 1;
			}
			else{
				this.count = 0;
			}
		})
		this.$http.get(`${this.api}/index/getTags`).then((result)=>{
			for(let i in result.data){
				let a = {};
				a.value = result.data[i].tag;
				this.tags.push(a);
			}
		})
	}
}
</script>

<style lang="scss" scoped>
 	.container {
		float: left;
	 	width: 50%; 
		height: 100%;
		padding:20px 30px;
		overflow: auto;
		box-sizing: border-box;
		padding-bottom: 27px;
		border-right: 1px solid black;
	}
	.passage {
		margin-bottom: 2rem;
	}
	button, input {
		border: 1px solid #bfcdb9;
		border-radius: 3px; 
	}
	button:hover, input:hover {
		border: 1px solid #8391a5;
	}
	#header {
		width: 100%;
		height: 30px;
		border: 1px solid #bfcdb9;
		border-radius: 3px;
	}
	#header:hover {
		border: 1px solid #8391a5;
	}
	.tags {
		margin-bottom: 25px;
	}
	.tags-to {
		padding: 10px 12px;
		margin: {
			bottom: 10px;
		}
		background: {
			color: rgba(0,0,0,0.2);
		}
	}
	.tag-to-input {
		display: block;
		height: 30px;
		margin: {
			top: 10px;
		}
	}
	.tag-to-select {
		display: inline-block;
		padding: 2px 3px;
		color: #fff;
		border-radius: 2px;
		margin: {
			left: 5px;
			right: 5px;
		}
		background: {
			color: rgba(40,40,40,0.8)
		}
		cursor: pointer;
	}
	.tag-icon {
		font-size: 14px;
	}
	.el-autocomplete {
		width: 86%;
		margin-left: 30px;
	}
	.passage label {
		margin-right:1.473rem;
	}
	textarea {
		width: 100%;
		resize: none;
		max-width: 75rem;
		display: block;
		margin: 0 auto;
		margin-bottom: 2rem;
		border: 1px solid #bfcdb9;
		border-radius: 3px;
	}
	textarea:hover {
		border: 1px solid #8391a5;
	}
	.upload-image {
		margin: {
			bottom: 25px;
		}
	}
	.el-button--primary, .el-button--success {
		background: {
			color: rgba(0,0,0,0.5);
		}
		border: 1px solid #A1A1A1;
	}
	.el-button--primary:hover, .el-button--success:hover{
		background: {
			color: rgba(0,0,0,0.35);
		}
	}
	.el-upload__tip {
		color: #29272b;
	}
	.post-passage {
		display:block;
		float: right;
		padding: 15px 18px;
		border-radius: 5px;
		border: 1px solid #a1a1a1;
		font-size: 1.2rem;
		background-color: rgba(0,0,0,0.5);
		color: white;
		transition: all 0.3s ease-in;
		&+p {
			color: #29272b;
		}
	}
	#paraDiv:hover {
		background-color: rgba(0,0,0,0.3);
	}
	button {
		cursor: pointer;
	}
	input[type=file] {
		border: none;
	}
</style>
