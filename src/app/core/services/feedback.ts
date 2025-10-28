import { Injectable, inject } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class Feedback {
  // 🔹 Configuração base (padrão Kivo)
  private baseOptions = {
    confirmButtonColor: '#2563EB',
    background: '#ffffffee',
    backdrop: 'rgba(15, 23, 42, 0.3)',
    customClass: {
      popup: 'rounded-2xl shadow-xl backdrop-blur-md',
      title: 'text-slate-800 font-semibold',
      htmlContainer: 'text-slate-600 text-sm',
      confirmButton: 'rounded-lg px-5 py-2 font-medium',
    },
    showClass: { popup: 'animate__animated animate__fadeInDown' },
    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
  };

  /** 🔹 Sucesso */
  success(message: string, title = 'Sucesso!') {
    this.alert(title, message, 'success');
  }

  /** 🔹 Erro */
  error(message: string, title = 'Erro!') {
    this.alert(title, message, 'error');
  }

  /** 🔹 Informação */
  info(message: string, title = 'Informação') {
    this.alert(title, message, 'info');
  }

  /** 🔹 Aviso */
  warning(message: string, title = 'Atenção!') {
    this.alert(title, message, 'warning');
  }

  /** 🔹 Confirmação (retorna uma Promise<boolean>) */
  async confirm(
    message: string,
    title = 'Tem certeza?',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar'
  ): Promise<boolean> {
    const res = await Swal.fire({
      ...this.baseOptions,
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
      cancelButtonColor: '#e5e7eb',
    });
    return res.isConfirmed;
  }

  private alert(title: string, message: string, icon: SweetAlertIcon) {
    Swal.fire({
      ...this.baseOptions,
      title,
      text: message,
      icon,
      timer: 2500,
      showConfirmButton: false,
    });
  }
}
