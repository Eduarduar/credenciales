-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2022 a las 22:30:31
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `credenciales`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `NoControl` double NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `ap_paterno` varchar(50) NOT NULL,
  `ap_materno` varchar(50) NOT NULL,
  `especialidad` int(11) NOT NULL,
  `curp` varchar(20) NOT NULL,
  `generacion` varchar(20) NOT NULL,
  `NSS` double NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`NoControl`, `nombre`, `ap_paterno`, `ap_materno`, `especialidad`, `curp`, `generacion`, `NSS`, `estado`) VALUES
(20840030548756, 'María', 'Valencia', 'Velásquez', 6, 'AACM651123MTSLLR06', '2020 - 2023', 6920052304, 0),
(20840043546834, 'Juan', 'Sandoval', 'Silva', 1, 'OOAZ900824MTSRLL08', '2020 - 2023', 4920442304, 1),
(20840057548756, 'Alejandra', 'Martínez', 'Padilla', 4, 'SAPM880429MTSNRR00', '2020 - 2023', 5950052304, 1),
(20840058548756, 'Alejandro', 'Fernando', 'Larios', 2, 'GORM680121MTSNDG06', '2020 - 2023', 6220755304, 1),
(20840091548756, 'Manuel', 'Garcia', 'Arechiga', 2, 'ROBG900321MTSDRD01', '2020 - 2023', 6810082304, 1),
(20840131548756, 'Eduardo', 'Llamas', 'Diego', 1, 'OIRY910429MTSRDL02', '2020 - 2023', 6924082304, 1),
(20840132548756, 'Johana', 'Pedraza', 'Ramos', 5, 'EIRJ720502HTSSDN06', '2020 - 2023', 4920052304, 1),
(20840148548756, 'Rubí', 'Beltran', 'Larios', 2, 'RIVS770301HTSVZL05', '2020 - 2023', 6920058304, 1),
(20840208548756, 'Saúl', 'Gómez', 'Baeza', 1, 'TITD600101HTSNRN09', '2020 - 2023', 4928752304, 1),
(20840221548756, 'Esmeralda', 'Pérez', 'Salazar', 6, 'MOCG481211MTSRSD25', '2020 - 2023', 8925057304, 1),
(20840223548756, 'Iván', 'Real', 'Sánchez', 4, 'MERG690406HTSDDD03', '2020 - 2023', 7920054304, 1),
(20840236548756, 'Aldo', 'López', 'Lucrecio', 5, 'CALF631005HTSSDR02', '2020 - 2023', 7928058304, 1),
(20840237548756, 'Sandra', 'Diaz', 'Martinez', 1, 'GAMS661004HTSLDL05', '2020 - 2023', 4928059304, 1),
(20840240548756, 'Adriana', 'Cuevas', 'Alcalá', 1, 'SECM620929HTSGPG06', '2020 - 2023', 2924052504, 0),
(20840250548756, 'Joseline', 'Juarez', 'Díaz', 2, 'AALT601015HTSLPR00', '2020 - 2023', 1920042304, 1),
(20840252548756, 'Abraham', 'López', 'Gutiérrez', 4, 'GORE781222HTSNBF01 ', '2020 - 2023', 7922062304, 1),
(20840273548756, 'Alejandro', 'Ibarra', 'Casttilo', 3, 'TORA780313MTSRDD04', '2020 - 2023', 6922072304, 1),
(20840317548756, 'Adrián', 'López', 'López', 2, 'TIPC490202HTSNZN07', '2020 - 2023', 2925072304, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultaspublic`
--

CREATE TABLE `consultaspublic` (
  `NoRegistro` int(11) NOT NULL,
  `accion` varchar(150) NOT NULL,
  `usuario` double NOT NULL,
  `fecha` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credencial`
--

CREATE TABLE `credencial` (
  `NoCredencial` varchar(10) NOT NULL,
  `alumno` double NOT NULL,
  `imagen` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `NoEspecialidad` int(11) NOT NULL,
  `nombreEspecialidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`NoEspecialidad`, `nombreEspecialidad`) VALUES
(1, 'Arquitectura'),
(2, 'Logistica'),
(3, 'Ofimatica'),
(4, 'Preparación de Alimentos y Bebidas'),
(5, 'Programación'),
(6, 'Contabilidad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientosuser`
--

CREATE TABLE `movimientosuser` (
  `NoRegistro` int(11) NOT NULL,
  `movimiento` varchar(150) NOT NULL,
  `usuario` int(11) NOT NULL,
  `fecha` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movimientosuser`
--

INSERT INTO `movimientosuser` (`NoRegistro`, `movimiento`, `usuario`, `fecha`) VALUES
(83, 'Inicio sessión', 2, '29/11/2022, 02:43:52'),
(84, 'Creo un nuevo usuario GCHINAC', 2, '29/11/2022, 03:17:30'),
(89, 'Modifico la informacion del usuario con id: 17', 2, '29/11/2022, 03:29:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `NoRol` int(11) NOT NULL,
  `nombreRol` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`NoRol`, `nombreRol`) VALUES
(1, 'admin'),
(2, 'moder');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `user` varchar(25) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `ap_paterno` varchar(25) NOT NULL,
  `ap_materno` varchar(25) NOT NULL,
  `telefono` double NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `rol` int(11) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `user`, `nombre`, `ap_paterno`, `ap_materno`, `telefono`, `mail`, `password`, `rol`, `estado`) VALUES
(2, 'Eduarduar', 'Eduardo', 'Arcega', 'Rodriguez', 1234567890, 'prueva@prueva.com', '$2y$10$mu1.0VKA5KEpimY7NhNz1.FFVxk/wV6mVhO5Zjp6qiWx0ZGdSPhP2', 1, 1),
(17, 'GCHINAC', 'Gabriel Ignacio', 'China', 'Cortéz', 1234567890, 'MtroChina@gmail.com', '$2y$10$Glo.pZhr2woeJaNtWDTune9aaOZGFNLSvLIQitqRaGpHJx0DJUpSm', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`NoControl`),
  ADD KEY `especialidad` (`especialidad`);

--
-- Indices de la tabla `consultaspublic`
--
ALTER TABLE `consultaspublic`
  ADD PRIMARY KEY (`NoRegistro`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `credencial`
--
ALTER TABLE `credencial`
  ADD PRIMARY KEY (`NoCredencial`),
  ADD KEY `alumno` (`alumno`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`NoEspecialidad`);

--
-- Indices de la tabla `movimientosuser`
--
ALTER TABLE `movimientosuser`
  ADD PRIMARY KEY (`NoRegistro`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`NoRol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `rol` (`rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consultaspublic`
--
ALTER TABLE `consultaspublic`
  MODIFY `NoRegistro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `NoEspecialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `movimientosuser`
--
ALTER TABLE `movimientosuser`
  MODIFY `NoRegistro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `NoRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`especialidad`) REFERENCES `especialidades` (`NoEspecialidad`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `consultaspublic`
--
ALTER TABLE `consultaspublic`
  ADD CONSTRAINT `consultaspublic_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `alumnos` (`NoControl`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `credencial`
--
ALTER TABLE `credencial`
  ADD CONSTRAINT `credencial_ibfk_1` FOREIGN KEY (`alumno`) REFERENCES `alumnos` (`NoControl`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `movimientosuser`
--
ALTER TABLE `movimientosuser`
  ADD CONSTRAINT `movimientosuser_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`ID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`NoRol`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
