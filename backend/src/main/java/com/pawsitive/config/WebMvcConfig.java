package com.pawsitive.config;

import jakarta.servlet.Filter;
import java.util.Collections;
import java.util.List;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CommonsRequestLoggingFilter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // configuration.addAllowedOrigin("*");
//        configuration.addAllowedOriginPattern("*");
        configuration.setAllowedOrigins(
            List.of("http://localhost:3000", "http://localhost:8080", "http://localhost:5173",
                "https://i10c111.p.ssafy.io", "https://c111pawsitive.netlify.app",
                "https://mynameis.site"));

        configuration.setAllowedOriginPatterns(
            List.of("http://localhost:3000/**", "http://localhost:8080/**", "http://localhost:5173",
                "https://i10c111.p.ssafy.io/**", "https://c111pawsitive.netlify.app/**",
                "https://mynameis.site/**"));
        configuration.setAllowedMethods(Collections.singletonList("*"));
        configuration.setAllowedHeaders(Collections.singletonList("*"));
//        configuration.addExposedHeader(JwtTokenUtil.HEADER_STRING);
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/resources/**").addResourceLocations("/WEB-INF/resources/");

        registry.addResourceHandler("swagger-ui.html")
            .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
            .addResourceLocations("classpath:/META-INF/resources/webjars/");

//        /*
//         *
//         * Front-end에서 참조하는 URL을 /dist로 매핑
//         *
//         */
//        registry.addResourceHandler("/css/**").addResourceLocations("classpath:/dist/css/");
//        registry.addResourceHandler("/fonts/**").addResourceLocations("classpath:/dist/fonts/");
//        registry.addResourceHandler("/icons/**").addResourceLocations("classpath:/dist/icons/");
//        registry.addResourceHandler("/img/**").addResourceLocations("classpath:/dist/img/");
//        registry.addResourceHandler("/js/**").addResourceLocations("classpath:/dist/js/");
    }

    public Filter requestLoggingFilter() {
        CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();
        loggingFilter.setIncludeClientInfo(true);
        loggingFilter.setIncludeQueryString(true);
        loggingFilter.setIncludePayload(true);
        loggingFilter.setIncludeHeaders(true);
        loggingFilter.setMaxPayloadLength(64000);
        return loggingFilter;
    }

    @Bean
    public FilterRegistrationBean loggingFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean(requestLoggingFilter());
        registration.addUrlPatterns("/api/*");
        return registration;
    }
}
