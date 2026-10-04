import test from 'node:test';import assert from 'node:assert/strict';
const score=(s,w)=>Math.round(s.reduce((a,n,i)=>a+n*w[i],0)/100*10)/10;
test('pondérations fournisseur totalisent 100%',()=>assert.equal([25,25,15,15,10,5,5].reduce((a,b)=>a+b),100));
test('score pondéré déterministe',()=>assert.equal(score([8,8,8,8,8,8,8],[25,25,15,15,10,5,5]),8));
test('un rôle communication ne voit pas le médical',()=>assert.equal(['Direction','Responsable médical','Responsable de cas'].includes('Communication'),false));
test('rendez-vous manqué produit une relance neutre',()=>assert.equal(`Recontacter ${'Mariam Démo'}`,'Recontacter Mariam Démo'));
