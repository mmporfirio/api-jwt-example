export function formatMaskedCPF(cpf: string): string {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length < 11) {
    cpf = cpf.padStart(11, '0');
  }

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '***.$2.$3-$4');
}
