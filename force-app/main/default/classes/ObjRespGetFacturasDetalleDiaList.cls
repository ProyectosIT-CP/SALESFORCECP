//
// Generated by JSON2Apex http://json2apex.herokuapp.com/
//

public class ObjRespGetFacturasDetalleDiaList {

	public Integer codigoCliente;
	public String codigoSucursal;
	public String codigoUnidadNegocio;
	public Integer numeroFactura;
	public Integer cantidad;
	public Integer precio;
	public Integer totalLinea;
	public String codigoItem;
	public String descripcion;

	
	public static List<ObjRespGetFacturasDetalleDiaList> parse(String json) {
		return (List<ObjRespGetFacturasDetalleDiaList>) System.JSON.deserialize(json, List<ObjRespGetFacturasDetalleDiaList>.class);
	}
}