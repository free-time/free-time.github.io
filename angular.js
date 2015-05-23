---
layout: default
title: Free time - Angular
permalink: /angular/
titlesecondary: Categoria Angular.js
---
{% for post in site.categories.angular  %}
<main role="main" class="main">
	<section class="lectures">
	    <article class="lecture-content">
	      <a href="{{ post.link }}" class="lecture-thumbnails" target="_blank">
	      	<img src="{{ post.img }}" alt="Anderson">
	      </a>
	      <a href="#"><h2 class="title-lecture">{{ post.title }}</h2></a>
	      <span class="btn-default watch"><a target="_blank" class="btn-default--link" href="{{ post.url }}">Assista agora!</a></span>
	    </article>
	</section>
</main>
{% endfor %}
