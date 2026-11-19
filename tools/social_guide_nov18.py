"""Social Scene guide refresh (Nov 18 2026).

New headline and dek (the old one said only 2 of 26 best beach towns made it; it's 5 of 30 now),
current prices on three cards, and the card blurbs rewritten in a local voice. Each replacement must
match exactly once.
"""
import pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
ART = ROOT / 'articles/best-florida-beach-towns-for-a-social-scene.html'
IDX = ROOT / 'assets/search-index.json'

OLD_H = "The Best Florida Beach Towns for a Social Scene Aren't on the Best Beaches"
NEW_H = "Florida's Most Social Beach Towns Are Built Around a Downtown, Not the Sand"
OLD_D = ("We scored 167 coastal towns on how easy it is to meet people. The winners have real downtowns. "
         "Only 2 of Florida's 26 best beach towns made the cut.")
NEW_D = ("We ranked 167 coastal towns on nightlife and how easy it is to meet people. The winners have a real "
         "downtown, and only 5 of our 30 best beach towns made the list.")

# (old, new, expected count)
EDITS = [
    (OLD_H, NEW_H, None),
    (OLD_D, NEW_D, None),
    ('"dateModified": "2026-11-03"', '"dateModified": "2026-11-18"', 1),
    # South Beach
    ("<p>Art deco along Ocean Drive, a beachwalk for sunrise runs and dinners that start late. You run the beachwalk at sunrise, work from a cafe and head out to dinner late.</p>",
     "<p>South Beach is the one place on the coast where you can skip the car and still never run out of plans. The beachwalk is busy at sunrise, Lincoln Road fills up by lunch, and dinner rarely starts before nine. You pay for it in condo fees, flood insurance and a lot of tourists.</p>", 1),
    # St. Pete
    ("<p>A sunny waterfront city with a walkable downtown, the Dalí Museum, murals on every block and Gulf beaches 20 minutes away. You walk the waterfront parks to the Pier, wander the Saturday Morning Market and pick a brewery for the afternoon.</p>",
     "<p>St. Pete is the downtown we send people to most. Central Avenue has the breweries and the murals, the Saturday Morning Market runs from fall through spring, and the Pier is where half the city ends up on a Sunday. The Gulf beaches are about 20 minutes west.</p>", 1),
    # Wilton Manors
    ("<p>A small island city ringed by the Middle River, built around the restaurants, bars and shops of Wilton Drive. You kayak the river loop around the city in the morning and walk Wilton Drive for dinner and a show at night.</p>",
     "<p>Wilton Drive is one of the friendliest main streets in South Florida, a strip of restaurants, bars and shops where regulars know the bartenders by name. The Middle River wraps the whole city, so you can paddle a loop in the morning, and the beach in Fort Lauderdale is about 10 minutes east.</p>", 1),
    # West Palm Beach
    ("<p>The downtown of Palm Beach County, with Clematis Street, a waterfront, the Norton Museum of Art and a Brightline train station. You walk the waterfront to the Saturday GreenMarket, spend the afternoon at the Norton and stay out on Clematis Street.</p>",
     "<p>Clematis Street is the night out, the Saturday GreenMarket on the waterfront is the morning after, and the Norton Museum fills the afternoon in between. Brightline gets you to Miami or Orlando without the drive, and the airport is about 10 minutes from downtown.</p>", 1),
    # Fort Lauderdale
    ("<p>A boating city of canals and marinas, where the boat goes out in the afternoon and dinner ends up on Las Olas. You take the boat out through the canals, then grab dinner on Las Olas.</p>",
     "<p>Fort Lauderdale runs on boats. Half the town seems to live on a canal, the boat goes out in the afternoon, and dinner ends up on Las Olas. Himmarshee is the late night, and the beach is one bridge away.</p>", 1),
    # Pensacola (price was the old $367K)
    ("<p>Pensacola is our favorite surprise on the list, for everything above. It's also more than 450 years old, the airport is about 15 minutes from downtown, and a typical home runs about $367K. That airport matters more than you'd think once the family starts visiting.</p>",
     "<p>Pensacola is our favorite surprise on this list. Palafox Street has the restaurants and the Saturday market, the city is more than 450 years old, and a typical home runs about $267K. The airport is about 15 minutes from downtown, which matters more than you'd think once the family starts visiting.</p>", 1),
    ("<i>Typical home price</i> about $367K", "<i>Typical home price</i> about $267K", 1),
    # Sarasota
    ("<p>The arts capital of the Gulf coast, with an opera, a ballet, The Ringling museum, Lido Beach just over the bridge and Siesta Key&#x27;s famous sand minutes away. You walk the bayfront at sunrise, spend the afternoon at The Ringling and see a show downtown at night.</p>",
     "<p>Sarasota has more culture than a town its size should: an opera, a ballet, The Ringling and a busy theater scene. Main Street is walkable, Lido Beach is just over the bridge, and Siesta Key is about 20 minutes south.</p>", 1),
    # Jacksonville Beach price
    ("<i>Typical home price</i> about $660K", "<i>Typical home price</i> about $720K", 1),
    # Miami price and the "only town" line (South Beach is 5 and 5 too)
    ("<i>Typical home price</i> about $570K", "<i>Typical home price</i> about $588K", 1),
    ("It's the only town on the coast with a 5 for nightlife and a 5 for meeting people.",
     "Along with South Beach, it's the only town on the coast with a 5 for both nightlife and meeting people.", 1),
    # Show up section
    ("<p>That's most of it. Pick two things, the Saturday market on Palafox, an art walk in Fort Myers, First Friday in Eau Gallie, the Friday concerts at the Landing, and go every week for a month.",
     "<p>The towns above make it easier, but the thing that works anywhere is simple. Pick two things, like the Saturday market on Palafox, an art walk in Fort Myers, First Friday in Eau Gallie or the Friday concerts at the Landing, and go every week for a month.", 1),
]


def main():
    s = ART.read_text()
    for old, new, n in EDITS:
        c = s.count(old)
        if c == 0 or (n is not None and c != n):
            sys.exit(f'expected {n} got {c}: {old[:70]}')
        s = s.replace(old, new)
    for bad in ("26 best", "$367K", "$660K", "$570K", "Aren't on"):
        assert bad not in s, bad
    ART.write_text(s)

    ix = IDX.read_text()
    assert ix.count(OLD_H) == 1
    IDX.write_text(ix.replace(OLD_H, NEW_H))
    print('ok')


if __name__ == '__main__':
    main()
