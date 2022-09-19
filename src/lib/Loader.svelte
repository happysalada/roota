<div id="space">
	<div class="elogo">
		<div class="trif u1" />
		<div class="trif u2" />
		<div class="trif u3" />
		<div class="trif u4" />
		<div class="ct" />
		<div class="trif l1" />
		<div class="trif l4" />
	</div>
	<h1>ethereum</h1>
</div>

<style>
	h1 {
		font-family: "Helvetica", sans-serif;
		font-size: 80px;
		font-weight: 100;
		letter-spacing: 30px;
	}

	#space {
		margin: auto;
		width: 600px;
		height: 500px;
		transform: perspective 400px;
		transform-origin: 110px 110px;
	}

	.elogo {
		margin: auto;
		position: relative;
		width: 400px;
		height: 400px;
		animation: ether_animation 6s infinite;
		transform-style: preserve-3d;
		transform-origin: 110px 110px 0;
		transform: perspective(400px) rotateY(46deg) rotateX(-5deg) rotateZ(-5deg);
	}

	.trif {
		position: absolute;
		width: 0px;
		height: 0px;
		border-left: 100px solid transparent;
		border-right: 100px solid transparent;
	}
	.elogo .u1 {
		transform: translateZ(50px) rotateX(23.5deg);
		border-bottom: 250px solid rgba(242, 38, 19, 0.5);
	}
	.elogo .u2 {
		transform: rotateY(90deg) translateZ(50px) rotateX(23.5deg);
		border-bottom: 250px solid rgba(255, 255, 0, 0.5);
	}
	.elogo .u3 {
		transform: rotateY(180deg) translateZ(50px) rotateX(23.5deg);
		border-bottom: 250px solid rgba(242, 38, 19, 0.5);
	}
	.elogo .u4 {
		transform: rotateY(-90deg) translateZ(50px) rotateX(23.5deg);
		border-bottom: 250px solid rgba(255, 255, 0, 0.5);
	}

	.elogo .ct {
		width: 200px;
		height: 200px;
		border: 0;
		transform: rotateX(-90deg) translateZ(140px);
		background-color: rgba(0, 230, 64, 0.7);
	}
	.elogo .l1 {
		transform: translateY(55px) translateZ(50px) rotateX(156.5deg);
		border-bottom: 250px solid rgba(3, 138, 255, 0.85);
	}
	.elogo .l4 {
		transform: translateY(55px) rotateY(-90deg) rotateZ(0deg) translateZ(50px)
			rotateX(156.5deg);
		border-bottom: 250px solid rgba(3, 138, 255, 0.45);
	}

	@keyframes ether_animation {
		0% {
			transform: perspective(400px) rotateY(46deg) rotateX(-5deg) rotateZ(-5deg);
		}
		33% {
			transform: perspective(400px) rotateY(86deg) rotateX(-5deg) rotateZ(-5deg);
		}
		66% {
			transform: perspective(400px) rotateY(6deg) rotateX(-5deg) rotateZ(-5deg);
		}
		100% {
			transform: perspective(400px) rotateY(46deg) rotateX(-5deg) rotateZ(-5deg);
		}
	}
</style>
