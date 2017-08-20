<template>
  <div class="container">
		<div class="passage">
			<label for="header">文章标题:</label><input id="header">
		</div>
		<textarea id="para" rows="30" cols="100"></textarea>
		<div class="img">
			<input name="file" id="upimg" type="file">
			<button id="ajax">插入图片</button>
		</div>
		<button id="paraDiv">上传文章</button>
		<p>请使用Markdown语法</p>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
 	.container {
	 	width: 58rem; 
		margin: 5rem auto;
		padding:20px 30px;
		background-color: rgba(255,255,255,0.7);
		overflow: auto;
	}
	.passage {
		margin-bottom: 2rem;
	}
	#header {
		width: 52rem;
	}
	.passage label {
		margin-right:1.473rem;
	}
	textarea {
		resize: none;
		width: 58rem;
		max-width: 75rem;
		display: block;
		margin: 0 auto;
		margin-bottom: 2rem;
		border: none;	
	}
	#paraDiv {
		display:block;
		float: right;
		padding: 15px 18px;
		border: none;
		border-radius: 5px;
		font-size: 1.2rem;
		background-color: rgba(0,162,232,0.7);
		color: white;
		transition: all 0.3s ease-in;
	}
	#paraDiv:hover {
		background-color: rgba(153,217,234,0.7);
	}
	#ajax {
		padding: 5px 8px;
		border-radius: 1px;
		font-size:1.1rem;
		transition: all 0.2s ease-in;
	}
	#ajax:hover {
		background-color: rgb(5,5,5);
		color: white;
	}
	button {
		cursor: pointer;
	}
	button ,input{
		border: none;
	}
</style>
