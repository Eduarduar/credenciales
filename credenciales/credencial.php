<?php

    include_once '../fpdf184/fpdf.php';

    // class PDF extends FPDF
    // {
    //     // Cabecera de página
    //     function Header()
    //     {
    //         // Logo
    //         $this->Image('../img/Logo_cetis_transparent.png',10,8,33);
    //         // Arial bold 15
    //         $this->SetFont('Arial','B',18);
    //         // Movernos a la derecha
    //         $this->Cell(80);
    //         // Título
    //         $this->Cell(30,10,'Noticias',0,0,'C');
    //         // Salto de línea
    //         $this->Ln(20);

    //         $this->SetFont('Arial','B',10); 

    //         $this->Cell(49, 10,utf8_decode('Titulo'), 1 , 0, 'C', 0);
    //         $this->Cell(49, 10,utf8_decode('Texto'), 1 , 0, 'C', 0);
    //         $this->Cell(49, 10,utf8_decode('Categoria'), 1 , 0, 'C', 0);
    //         $this->Cell(49, 10,utf8_decode('Fecha'), 1 , 1, 'C', 0);
    //     }

    //     Pie de página
    //     function Footer()
    //     {
    //         // Posición: a 1,5 cm del final
    //         $this->SetY(-15);
    //         // Arial italic 8
    //         $this->SetFont('Arial','I',8);
    //         // Número de página
    //         $this->Cell(0,10,'Pagina '.$this->PageNo().'/{nb}',0,0,'C');
    //     }
    // }

    $pdf = new FPDF('P', 'cm', array(5.5,8.5));
    $pdf->AddPage(); // Agregamos una pagina

    $pdf->Image('../img/Logo_cetis_transparent.png',0.1,0.1,2);
    
    $pdf->SetFont('Arial','',3.5);
    $pdf->SetTextColor(167, 32, 31);
    $pdf->Text(2.8,0.4,utf8_decode('DIRECCIÓN GENERAL DE EDUCACIÓN'));
    $pdf->Text(3.5,0.53,utf8_decode('TECNOLÓGICA INDUSTRIAL'));

    $pdf->SetFont('Arial','B',9);
    $pdf->Text(3.7,0.8,utf8_decode('CETIS 84'));

    $pdf->SetFont('Arial','',9);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->Text(3.4,1.5,utf8_decode('06DCT0084Z'));

    $pdf->Text(0.3,3.4,utf8_decode('ARCEGA'));
    $pdf->Text(0.3,3.8,utf8_decode('RODRIGUEZ'));
    $pdf->Text(0.3,4.2,utf8_decode('EDUARDO'));

    $pdf->Output(); // Cierra y guarda el documento

?>