package io.github.shivenducs1136.chessbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@SpringBootApplication
public class ChessbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChessbackendApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/ws").allowedOrigins("https://chess.hishivendu.qzz.io/");
			}
		};
	}
}
