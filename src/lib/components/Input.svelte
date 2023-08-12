<script type="text/javascript">
	import { onMount } from 'svelte'

	export let onSend;
	export let commandsAvailable = [];

	const placeholder = "Type a message..."

	let text;
	let autocomplete;

	function moveCursorToEnd(element) {
		const range = document.createRange();
		const selection = window.getSelection();

		// Set the range to the end of the element's text
		range.selectNodeContents(element);
		range.collapse(false); // Collapse the range to the end

		// Clear any existing selections and set the new range
		selection.removeAllRanges();
		selection.addRange(range);
	  }

	function handleInput(e) {
		autocomplete.innerText = '';

		if(text.innerText.length == 0) autocomplete.innerText = placeholder;
		if(text.innerText.startsWith('/')) {
			let cmd = commandsAvailable.find(cmd => cmd.startsWith(text.innerText))

			if(cmd) autocomplete.innerText = cmd.slice(text.innerText.length)
		}
	}

	function handleKeydown(e) {
		if(event.keyCode === 13 || event.key === 'Enter') {
			e.preventDefault();

			if(!text.innerText.length) return

			onSend(text.innerText)
			text.innerText = ''; 
			autocomplete.innerText = placeholder;
		}
	}

	function setFocus() {
		text.focus();
		moveCursorToEnd(text)
	}
</script>

<div class="main">
	<div class="input" on:click={setFocus}>
		<span 
			class="text" 
			contenteditable 
			bind:this={text} 
			on:input={handleInput}
			on:keydown={handleKeydown}
		/>
		<span class="autocomplete" bind:this={autocomplete}>{ placeholder }</span>
	</div>
	<span class="material-symbols-sharp">send</span>
</div>

<style type="text/css">
	.text {
		outline: none;
		white-space: nowrap;
	}

	.autocomplete {
		opacity: .4;
		overflow: hidden;
		text-overflow: none;
		white-space: nowrap;
	}

	.input {
		background: rgba(255, 255, 255, .025);
		border-radius: 7px;

		width: 100%;
		height: calc(100% - 10px);
		margin: 0 10px;

		padding: 0 .8em;

		display: flex;
		align-items: center;

		position: relative;
		cursor: text;
		overflow: hidden;
	}

	.main {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: clamp(40px, 3em, 80px);
		background: rgba(255, 255, 255, .025);

		display: flex;
		align-items: center;
	}

	.main > span {
		margin-right: .3em;
		padding: .2em;
		border-radius: 7.5px;
		opacity: .85;

		transition: 100ms background;
		cursor: pointer;
	}

	.main > span:hover {
		background: rgb(25, 195, 125);
	}
</style>