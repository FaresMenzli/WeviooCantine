 package com.example.PFE.Back.Configuration;
// import org.springframework.security.oauth2.jwt.JwtDecoder;
//
//
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
// import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.config.ldap.EmbeddedLdapServerContextSourceFactoryBean;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
// import org.springframework.security.provisioning.JdbcUserDetailsManager;
// import org.springframework.security.provisioning.UserDetailsManager;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
// import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
// import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
// import org.springframework.stereotype.Component;
//
// import javax.sql.DataSource;
//
// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {
//
//     @Autowired
//     private MyUserDetailsService userDetailsService;
//
//     @Autowired
//     private BCryptPasswordEncoder passwordEncoder;
//
//     @Override
//     protected void configure(HttpSecurity http) throws Exception {
//         http
//                 .authorizeHttpRequests((authz) -> authz
//                         .anyRequest().authenticated()
//                 )
//                 .httpBasic(Customizer.withDefaults());
//     }
//
//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//                 .authorizeHttpRequests((authz) -> authz
//                         .anyRequest().authenticated()
//                 )
//                 .httpBasic(Customizer.withDefaults());
//         return http.build();
//     }
//     @Bean
//     public WebSecurityCustomizer webSecurityCustomizer() {
//         return (web) -> web.ignoring().anyRequest().requestMatchers("/ignore1", "/ignore2");
//     }
//     @Bean
//     public DataSource dataSource() {
//         return new EmbeddedDatabaseBuilder()
//                 .setType(EmbeddedDatabaseType.H2)
//                 .addScript(JdbcDaoImpl.DEFAULT_USER_SCHEMA_DDL_LOCATION)
//                 .build();
//     }
//
//     @Bean
//     public UserDetailsManager users(DataSource dataSource) {
//         UserDetails user = User.withDefaultPasswordEncoder()
//                 .username("user")
//                 .password("password")
//                 .roles("USER")
//                 .build();
//         JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
//         users.createUser(user);
//         return users;
//     }
//
//     // Custom handlers (optional)
//     @Component
//     public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//         // ... implementation ...
//     }
//
//     @Component
//     public class CustomLogoutSuccessHandler extends HttpStatusReturningLogoutSuccessHandler {
//         // ... implementation ...
//     }
// }
// @EnableWebSecurity
// @Configuration
// public class SecurityConfig {
//
//     @Bean
//     public UserDetailsService userDetailsService() {
//         // Implement your user details service here (in-memory, database, etc.)
//         return null;
//     }
//
//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder(12); // Specify the desired strength (e.g., 12)
//     }
//
//
//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//                 .authorizeHttpRequests(authorize -> authorize
//                         .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
//                         .requestMatchers("/admin/**").hasRole("ADMIN")
//                         .requestMatchers("/staff/**").hasRole("KITCHEN_STAFF")
//                         .requestMatchers("/**").hasRole("COLLABORATER")
//                         .anyRequest().authenticated()
//                 )
//                 .formLogin(form -> form
//                 .loginPage("/login")
//                 .permitAll()
//         )
//                 .logout(logout -> logout
//                         .logoutUrl("/logout")
//                         .permitAll()
//                 );
//
//         return http.build();
//     }
//     @Bean
//     public JwtDecoder jwtDecoder() {
//         return NimbusJwtDecoder.withJwkSetUri("https://example.com/.well-known/jwks.json").build();
//     }
//
// }