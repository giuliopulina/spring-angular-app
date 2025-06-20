package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import static org.springframework.http.HttpMethod.*;

@Configuration
public class RestDataConfig implements RepositoryRestConfigurer {

    private static final HttpMethod[] HTTP_METHODS_TO_EXCLUDE = {PUT, DELETE, POST};

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        config.exposeIdsFor(Product.class, ProductCategory.class)
                .getExposureConfiguration().forDomainType(Product.class).withItemExposure(
                        (metadata, httpMethods) -> httpMethods.disable(HTTP_METHODS_TO_EXCLUDE))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(HTTP_METHODS_TO_EXCLUDE));

    }
}