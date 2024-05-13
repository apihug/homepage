@RestController
public class OrderController {
  @PostMapping("/order/place")
  @Operation(description = "place a new order")
  public ResponseEntity<Result<OrderPlacedResponse>> place(
    @RequestBody @Valid PlaceOrderRequest request) {
    //TODO
  }

  @GetMapping("/order/query")
  @Operation(description = "query all live orders")
  public ResponseEntity<PageableResult<OrderView>> query(
    @RequestBody @Valid QueryOrderRequest request) {
    //TODO
  }
}
