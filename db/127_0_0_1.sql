-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-11-2022 a las 06:59:43
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
CREATE DATABASE IF NOT EXISTS `credenciales` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `credenciales`;

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
(20840030, 'María', 'Valencia', 'Velásquez', 6, 'MAOS010914', '2020 - 2023', 6920052304, 1),
(20840043, 'Juan', 'Sandoval', 'Silva', 1, 'GOHA020219', '2020 - 2023', 4920442304, 1),
(20840057, 'Alejandra', 'Martínez', 'Padilla', 4, 'DUDA980819', '2020 - 2023', 5950052304, 1),
(20840058, 'Alejandro', 'Fernandez', 'Larios', 2, 'GAAM991029', '2020 - 2023', 6220755304, 1),
(20840091, 'Manuel', 'Garcia', 'Arechiga', 3, 'LADE950908', '2020 - 2023', 6810082304, 1),
(20840131, 'Eduardo', 'Llamas', 'Diego', 1, 'LOLA990519', '2020 - 2023', 6924082304, 1),
(20840132, 'Johana', 'Pedraza', 'Ramos', 5, 'DIMS020918', '2020 - 2023', 4920052304, 1),
(20840148, 'Rubí', 'Beltran', 'Larios', 1, 'ROMA020918', '2020 - 2023', 6920058304, 1),
(20840187, 'Mayte', 'Arias', 'Téllez', 4, 'SILA616568', '2020 - 2023', 7924055304, 1),
(20840208, 'Saúl', 'Gómez', 'Baeza', 1, 'CAGV265165', '2020 - 2023', 4928752304, 1),
(20840221, 'Esmeralda', 'Pérez', 'Salazar', 6, 'BARM615616', '2020 - 2023', 8925057304, 1),
(20840223, 'Iván', 'Real', 'Sánchez', 4, 'MEPJ165168', '2020 - 2023', 7920054304, 1),
(20840236, 'Aldo', 'López', 'Lucrecio', 5, 'ARRE465498', '2020 - 2023', 7928058304, 1),
(20840237, 'Sandra', 'Diaz', 'Martinez', 1, 'MARM651654', '2020 - 2023', 4928059304, 1),
(20840240, 'Adriana', 'Cuevas', 'Alcalá', 1, 'MELB516516', '2020 - 2023', 2924052504, 1),
(20840250, 'Joseline', 'Juarez', 'Díaz', 2, 'PACL651655', '2020 - 2023', 1920042304, 1),
(20840252, 'Abraham', 'López', 'Gutiérrez', 4, 'MOCB564984', '2020 - 2023', 7922062304, 1),
(20840255, 'Veronica', 'Franco', 'Arana', 6, 'GOHM651654', '2020 - 2023', 8921042304, 1),
(20840273, 'Alejandro', 'Ibarra', 'Casttilo', 3, 'CEVA561649', '2020 - 2023', 6922072304, 1),
(20840317, 'Adrián', 'López', 'López', 2, 'JUCG651654', '2020 - 2023', 2925072304, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultaspublic`
--

CREATE TABLE `consultaspublic` (
  `NoRegistro` int(11) NOT NULL,
  `accion` varchar(100) NOT NULL,
  `usuario` double NOT NULL,
  `fecha` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credencial`
--

CREATE TABLE `credencial` (
  `NoCredencial` int(11) NOT NULL,
  `alumno` double NOT NULL,
  `Imagen` varchar(50) NOT NULL
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
  `movimiento` varchar(100) NOT NULL,
  `usuario` int(11) NOT NULL,
  `fecha` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `tema` int(11) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `user`, `nombre`, `ap_paterno`, `ap_materno`, `telefono`, `mail`, `password`, `rol`, `tema`, `estado`) VALUES
(2, 'Eduarduar', 'Eduardo', 'Arcega', 'Rodriguez', 1234567890, 'prueva@prueva.com', '$2y$10$opjdopGxo2xbtw/X9FfGmOhky7ECNw/PEHzvvMUUiB9sslXoD1TGu', 1, 1, 1),
(3, 'Saul1', 'Saul Elizandro', 'Madrigal', 'Ortega', 1234567890, 'prueva@prueva.com', '$2y$10$opjdopGxo2xbtw/X9FfGmOhky7ECNw/PEHzvvMUUiB9sslXoD1TGu', 2, 1, 1),
(4, 'Marco', 'Marco Dair', 'Martin', 'Rojo', 1234567890, 'prueva@prueva.com', '$2y$10$opjdopGxo2xbtw/X9FfGmOhky7ECNw/PEHzvvMUUiB9sslXoD1TGu', 1, 1, 0);

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
  MODIFY `NoRegistro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `credencial`
--
ALTER TABLE `credencial`
  MODIFY `NoCredencial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `NoEspecialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `movimientosuser`
--
ALTER TABLE `movimientosuser`
  MODIFY `NoRegistro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `NoRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
