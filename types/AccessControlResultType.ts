/**
 * Résultat du contrôle d'accès à une URL
 * authorized = Accès autorisé
 * unauthorized = Accès non autorisé (authentification requise)
 * forbidden = Accès interdit (rôles utilisateurs insuffisants)
 */
type AccessControlResultType = 'authorized' | 'unauthorized' | 'forbidden';

export default AccessControlResultType;
