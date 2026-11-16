import { decodePolyline } from './polyline';

export type LatLng = { latitude: number; longitude: number };

export type Stage = {
  id: string;
  code: string; // código oficial, ej. SS1/5
  name: string;
  day: string;
  distanceKm: number;
  coordinates: LatLng[];
};

// Tramos cronometrados del Rally del Paraguay 2026 (mapa oficial), como referencia.
// Todavía no hay tramos confirmados para 2027: reemplazar esta lista cuando los haya.
// Las rutas están guardadas como polilíneas codificadas (formato de Google) para ocupar poco.
const RAW_STAGES = [
  {
    id: 'sd-shakedown',
    code: 'SD',
    name: 'Shakedown',
    day: 'Shakedown',
    distanceKm: 5.7,
    path: 'j|ieD|u`uI^~@fAQz@_B~Bs@dAaA\\kBu@oCi@Gk@L_DdBi@r@k@AgAeAASyCyD{BiAoFiB}A{BkFcGoHaGiO_NwEuGsDaBgB`@q@KwJwDOc@T{Ay@}BWoEx@kFsAwBkBuBiBuAaBm@Sq@\\}Gr@kAr@sEdCkD~@wC@m@qG_NyDaD`_@y_@tByCbCwAnHwH_OcS',
  },
  {
    id: 'ss1-5-cambyret',
    code: 'SS1/5',
    name: 'Cambyretá',
    day: 'Viernes',
    distanceKm: 24.7,
    path: 'tmefDfxdsIfSuUzDaBjAgF^a@hEXnByBb@eAdEkEZ{@k@_C^oB_AeB{DcEm@gAEaFe@w@_@{Bq@uBm@wHg@eA_@oFqAGw@z@cA`@a@z@w@?aA_AcAeDw@y@YH_DhDuDpEkPnVaCfBoFxGkCnBaCp@eAp@_@jBiC`FeFrFcBfCiC`C}@bBoDgE[B}AvAx@|CnAjBgQlSoKkM}HiIHq@tIsJ\\aAf@{CuDz@uAbAkA~AcAPy@KmCmBsF_CiCNoCoCsNiQqC@[hBDx@O\\gBrA}@@w@`@wC|BMTAlAc@x@^z@A^_DVoBlA_@^O|CUn@QPq@GOSRoBGiBJS|@QnBoAlBeEvE}FhBeE\\]bA?j@m@Uy@PaD_X_[nL_ObCuBzEkFhPfRxCdCrEzBhCpB`F`HhE~Dh@`DlAtCbBpAhKbCd@`@`@hAnAyFvDyChGcDv@q@vLaP`JkOV_A?qERq@b@c@rAc@\\u@Sw@yAaBwCkHwA{FD}@`@w@]e@eFgEqDwE{NeFmMqHdAeDX}Cs@{AgAqEUWeAc@cBS_Bn@uDf@yAh@sNgP|UqYe@sAk@M]HmCr@gAt@w@zAM`Aa@~@uIbLWh@AjAkJ}Ke@CIe@oCiCwTqYcAUq@eBsBeCiAk@{CqCaHcJsCaD}DyCaFeGuBcBk@IFm@o@oAcZc[mJaLhKkLjKuM~@KWi@pM}NeYi]iDgCs@mBkm@{r@nf@mk@iLuM',
  },
  {
    id: 'ss2-6-nueva-alborada',
    code: 'SS2/6',
    name: 'Nueva Alborada',
    day: 'Viernes',
    distanceKm: 15.8,
    path: 'djyeDpnmrIH_@_HeNBQrQgMpAiChAkAh@mAK_A}BuAgSyHoBuB_Am@Wi@F{@jA_B@aA}@iABaEK_@mBqAUEgBzB]F_HyDaDjFQB{DqCmBiCsFyCWC{@h@aArB{BhCsBy@y@HwChE{BfG}Yna@_Cp@sCkDgACg@Z}KlMqD}Di@G}Al@oB{AK_@ZmCcMmOyAuAoD{AYyH}Du@{D]i@zDaFdK]PaBcAwBcCu@Uo@Zcc@bk@MXA|Aq@xE_AlCLz@pFrIrLdMvGjI|BzDqJzK_CfBoA|B_IbK}UhXk@YmDmDMoBS_@kBqAwBOeCuCmD{AmL_JgC_C}@uAAQhRsTn@uAVoB}AmJb@eDIQgCi@aBGuCsDqAs@w@_CmMiMqAW}D}AqEJsDOiE_AeGk@gHyAw@PoF~QjBtK~@vCBbCn@xD?~@OdAwCbGM`Aq@|AkCsA{B?qDgCcCt@a@Gk@]s@gCoCkEw@Y_AAwBX_CdCiDpCcKzK',
  },
  {
    id: 'ss3-7-yerbateras',
    code: 'SS3/7',
    name: 'Yerbateras',
    day: 'Viernes',
    distanceKm: 34.2,
    path: 'vojeDbmlrIlCgOKmA]cAsDoFo@o@_MoF}KoBg@UwByCoAuDXsC]oANqA|AcFbA}Bk@q@aB_@_D@cAnNqFiByDsBqCwFaBeCgDkBsDyA{I~Tn@xJh@hAf@dDh@v@Cn@aBzDiEzC}AxEfHpEr@`Bt@`AqJtFyIAgJ`BiAn@{n@rv@?v@v@z@vMtHkF~IiEvFiBtHeAnBeBdAeGb@qAl@cCTgDlC{@tAcAjFQtCqAbFiBvD{C`CkApCUtAGjC{@jFyAhEsBbJNrDOz@w@xAeCzCoBxE[XeE~@}FxFuEp@o@n@i@xH]hBo@tAkAv@uLbDwDMYFMb@FxEK|Aj@nDI~CLxEQdGd@tJLXvDrArI?~@PnD|A|KzA`TcXoCqCiBiDMsBtAV`@zBn@KpAiIrCsE|@WfI~FlUqXxJoKrBeEjFoDbHoJhB}CtA{@lA_Bl@eBtAwBlAo@pCw@h@a@lNwQrIcKrAkCzN\\rFa@|Hd@tNyFa@tAv@jBFr@o@hD_ArBuJzIKXB`@tC`GGh@yCnDwE|Bi@h@yCzEkSzVgEjE@Xh@|@Ll@Qv@gC`EBbEQvDyAfBaBz@iA|AuAlAOvDuCfD{@vBoDnD_BpCeBlAgBpBCpAcA~C}FxE_AdE_FvFS~Gv@z@VlAoCrDyDdDBnBgClEvBv@xAbArDvEn@`@dDv@z@~@`@lAzAhIFvAaAn@yFtHU`AIhD_@n@{BhBsBPk@\\k[p_@sJ}JYBqBvBqCdBuDtDc@r@gAbF}@PyE?oC_@kBFmAb@qAbCqI~HpPnXrCSjCPjD|AbCI|JtC^b@pArDjBlC`@`BpAdB`AdCh@Pr@IfCuA|Dd@dC{BpCcDbGqBvBeBjIrJjCfCpJ|LfFxFzGqIDgAkDaEm@iMs@gFMoDuQ{UzF{HaG{GJgCy@qJNaBtMmGdAuAtCiI\\sBMgBp@d@f^za@o@d@b@`@t@SzUnXLd@Gd@gApBOv@uAjBKrA`IpKrEtD`@FlCcCtCuA^LhDhElCwExFvF|BaBfLnN_HxHrCbD',
  },
  {
    id: 'ss4-8-aut-dromo',
    code: 'SS4/8',
    name: 'Autódromo',
    day: 'Viernes',
    distanceKm: 2.6,
    path: 'bjbeDbausInAYh@aAU}CFoASo@eDgDWMc@BUf@Fl@~BtB^r@Oj@q@\\iASgJwKsAcAWi@hA@TNZjAtCbBb@nAd@h@TCjAkCQyAiAeAa@aA_Aq@u@r@SxAMHKKGUb@yA@w@i@aB}@k@c@X?Vh@zCSX[B_AoA}@uBa@_Dg@_A_BC_AjACr@Lt@zDxE',
  },
  {
    id: 'ss9-13-bella-vista',
    code: 'SS9/13',
    name: 'Bella Vista',
    day: 'Sábado',
    distanceKm: 21.2,
    path: 'fkucD`jpqIfIwJn@Dzb@re@n@Pn@MnMiMLu@Um@CiAXkAv@w@h@KbBJp@UtHmILi@QoCFo@d@uABgDh@{AlA_Al@I`@H`Ax@xCx@vBFpA]tY_`@Di@q@aGLQjEmEhCwAzDCbFz@jFPfCStAZ_B|ASj@LtB\\l@pKdE`ErC\\ARQ|AeEv@yAf@K~BFpAMbAd@vARz@dAbBZ`Fy@rAC\\PPp@QlI_@t@w@f@Y@uAjBoExCiDdA_An@wDnCE\\h@xATJ`Bi@NFdG~J~C|HT~ACdAu@bEWpG?`@\\p@bAnAb@Jj@GjCwCJBbX~ZyGxIE^zRdVRx@GZmGfHaE~DAXnJhM|FrGZt@F~AxG~FpHxIvNzNrToU~HoK~RcV`CiDWoBHY~G{LVBhI`GpSxOp@CtDsGZGZDlJnHbPgYke@m]y@a@aHwAaC@}A[{IqDqCmBgGcHpQaUBw@Zk@ZGZNrN}PdNqOf@Ir@Nz@f@zKpNvDvFXAx@eA\\ErGXXb@eGlLuG`KB\\l@n@bLzI?d@kDhGBd@dOfM}H|LEj@iE~GDV`OvGjGhAvDZjCn@dA]xAgAxCuCvNfP',
  },
  {
    id: 'ss10-14-bella-vista-sur',
    code: 'SS10/14',
    name: 'Bella Vista Sur',
    day: 'Sábado',
    distanceKm: 11.3,
    path: 'h~fdDdpxqIkFzM}@`BDrA^j@O\\e@@q@WoAsAS{@XqA|I_LLsBk@kAg@]}Bh@iBtAkA|Am@pAkAx@y@bA]IKa@rDgDhCeEl@c@j@_BxCs@nAk@|@w@|AoDs@aJHo@dAa@nDeCjBMf@Fr@dD@z@U\\s@BsBgAk@K}@Nk@nEJ|@x@h@\\rB@~@_A~BV|AbDc@tEbAbCfAh@AnAkA`T}UrSpU`CtEbCpB~LhMNt@w@rAF`@|JpMgFhFE`@VlBvAbCOb@f@dAGVPt@QPQa@kCbD~@x@eBhF{B`DFxBrBh@rEgFpBlBpQcT`GbHdAqAXIpBxBbA]rA|Az@QhAq@lCfAb@Mx@iAl@MdBxAt@jAi@bBBnBZb@z@c@TXcArDuA~Ia@`Ae@hGw@zBa@hC?n@V`AOfG{@bBg@hEs@`AW|B]PQ`@A|Aa@pCQfDeBbD[KOq@AmAq@kCiDmDuAkDi@i@eG{BaAcBqCuCg@QQq@~@{ACe@}BNgAZaCpBs@T_CYi@WqBeGx@iC`@sDhAaB',
  },
  {
    id: 'ss11-15-hohenau',
    code: 'SS11/15',
    name: 'Hohenau',
    day: 'Sábado',
    distanceKm: 19.5,
    path: 'z~odDbqmrIna@|\\Lp@iEvILlAjCjB\\bBzDvAvDxEBX{GtIcWx]m@lAfQfQDZ}GjIqArCWNcAGsBxA{AUuBPi@j@Qv@q@Te@n@}@b@GVHb@dB`BBPg@jAxArCNx@kQzSiB{BoCSw@i@m@m@Ik@f@Ap@p@V`ApBvCxAz@nFvGe@xFjWvYbJ}JvRqUnAo@lN}CtJcBzZoC~A@O~@l`@zc@jB|@xDn@dAr@~BrCtClAhGjLnEjGHVI~AJf@lRnT^I~FcHVGf@j@f@t@JdAmA~FWlBEdBzMpOtCnBp@pBxHpIrj@ep@h@?rNfPBZoG|Gp@`XiHxIWLwBQkBrAIxA`Ax@bAMnBXj@\\_@dDtC|AETsMh@`@bDdCzBVx@@p@_a@rb@cBnAgE^kDLaJOiAh@uBrBeAb@iAF{CbAoDX{CzBo@|Cq@r@eDfBsEz@iC|BgDpA_C`DoHxGWb@oAzFwCbGkHnIgAnEeFdLq@hE{[{^wCfX',
  },
  {
    id: 'ss12-16-trinidad',
    code: 'SS12/16',
    name: 'Trinidad',
    day: 'Sábado',
    distanceKm: 14.9,
    path: 'fodeDfdcsI{JgLkAyCi@q@kC{Awb@{f@bSoUmOsQa@AcBj@mAg@iEoGuAsAaAqDqBkDcEaEIaAaNwNmBe@wCMg@{@_@Cc@b@eAnIVvBf@fBKb@_CrAoBj@m@EmEeEm@D_DfE[@uJeL]EoF|GSD]KyIcLuDcDgS}Xm@Cc]b`@oEN{HiJi@p@BdAWjC~HbKkEfFXvBf@rAgAz@]nBz@fAUr@Hb@vARJ^pC`An@fGFvCbApABXhNhPn@jE`AfCOZTbEjAfEyA~B}H}CsFjCmD^qCbMcApCiCfBm@bOkKqM_Xv[{CjBiBHeHuC_C]iBKoEt@sBaAc@dCoA^k@r@cBt@yK|LuDbKuArMwMzEgKLeAj@}EtFUlATbCoC~EG~@Hz@nKzMh@~@P~@UlA{Q|S',
  },
  {
    id: 'ss17-costanera',
    code: 'SS17',
    name: 'Costanera',
    day: 'Sábado',
    distanceKm: 3.1,
    path: 'nd|eDvs}sIwFxPZZt@CfEmPd@AZ|@Ez@m@z@LXMlAuAd@LfDm@pAuD|@C~A|@|E|@Ed@}@]cBvAiDdAIlAVx@fAgApAcBb@]b@Vb@rD@Cn@sARKQuAXY`@eATOMkDfAM`@mBt@y@UWW{@jCCf@z@l@cCrAg@c@e@rBgC|BmDtB[h@gCn@sF\\',
  },
  {
    id: 'ss18-22-encarnaci-n',
    code: 'SS18/22',
    name: 'Encarnación',
    day: 'Domingo',
    distanceKm: 10.3,
    path: 'bdoeDx}btIu@z@wA~@{ARgHJyCxA_ANiF]qB\\wBIoBa@uCJuFoA_Kv@aCgAuIyGkCWwFh@aDwAgDdCkEnKeDjDu@rAi@|EyJhYJn@dF|FlBdFZnC|@|AbD|@zMK`E_@jMuBbGmBbDaEhAyDd@c@l@AjCnBrC{FzRxBbC@lB\\fBMjBg@~@c@fBwBfAm@tBu@nEq@~FgCdEcAjAuChC{CzEm@^m@Um@yEf@WMMu@Ne@rAZvAFn@UL_@GUgDQWa@bCi@`@qA\\MtEl@MhBn@pCTRRBd@_AXARN@t@NRvBVhAi@bCRvGF|@YzAr@vCRzBOLc@c@OJByGg@]WqNc@mAS}@Z[i@Zk@zERzAIxBVb@XrBi@jCHnCn@|BbARCrAeAnFsCvBoEvG\\fIvGn@F`DqAlBAh@SxAXxA~A',
  },
  {
    id: 'ss19-21-artigas-este',
    code: 'SS19/21',
    name: 'Artigas Este',
    day: 'Domingo',
    distanceKm: 19.9,
    path: 'txycDvpouIN|AmAxBK~BpC~AT|@AtAsCb@q@_@mB`AaDq@iA`Ac@dADfAeAlB}ClCg@dBJpB`DxCjD?bDpBp@tBh@|DuEtLsP~TkDtDs@hDW|BClBPbDsNz^iDrG}C^aBjAaK|Jy@|DMtGsAlC}HfBw]TcEoAcPm@_UhLqChe@e@hAwDbEzBxAtH|JnA`@vE~IXJlKv@pGz@nKxCbAL|HGpN{CfFP~KbDfANhACpCo@rBsAEP|KuIzDcApCr@xLgJzE}JnCcDbDcClAuAtCsBrBqEtCkD?e@tAuA\\s@d@{BvMsRhAeF~@oBrBqC|J{P|C{B~BiCpApA\\r@dAvFfA~ApE~BbFnDbHhGpKlIj@PzBB`@PxJ`MuBxQs@ZuCfEaL~JmA|GwKbEvCvQdFvGg@~Di@lIjC`U?vO_IlRnNvJhIZrDfA]vFXpNUxAw@hAoDjBeFnDgEvGuFtGpF`GtBjGHdJi@tGvEnL|AnI{IdV',
  },
  {
    id: 'ss20-artigas-oeste',
    code: 'SS20',
    name: 'Artigas Oeste',
    day: 'Domingo',
    distanceKm: 8.6,
    path: 'daycDfqcvIgCrJeErLmAfCsDhD_AhB?vFU\\uQfB{JpAaDv@kGEy@P_@RSbAG`Ek@h@d@fDr@jClB~ElDbGZNfBg@tBrAnAQdDhDh@CvFaDnJPlFfCnBj@fFGjAH`Ad@`B~A^nANfDIxAbDjMbEhFXJnB[`APpGbBrAdAVb@N`ABtBbBrEx@zGjTsML_@FiC`AeDR}Ai@gIRaBvAsBrNqMV{@P_CqKyBiGoB}@wB}EiQYEq@gDUMuDVeAg@qDfEaDdCo@iAAc@k@q@KcArEkFlAKbBsBNs@Ga@T_AQqAy@wA`CqDcAkFf@mL',
  },
];

export const STAGES: Stage[] = RAW_STAGES.map(({ path, ...stage }) => ({
  ...stage,
  coordinates: decodePolyline(path),
}));
